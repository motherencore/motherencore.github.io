import fs from 'fs';
import path from 'path';
import { parse } from 'vue-docgen-api';

const projectRoot = process.cwd();
const componentsDir = path.join(projectRoot, 'src/components'); 
const baseDocsDir = path.join(projectRoot, 'docs/components');     

function sanitizeTableCell(text) {
	if (text === undefined || text === null) return '-';
	const stringVal = String(text).trim();
	if (stringVal === '') return '-';
	return stringVal.replace(/\|/g, '\\|').replace(/[\r\n]+/g, ' ');
}

function cleanDocComment(text, componentName) {
	if (!text) return 'Docstrings Missing.';
	
	let cleaned = String(text)
		.replace(/^\s*\*\s*/gm, '')
		.replace(/\/\*\*?|\*\/|@\w+/g, '')
		.trim();

	if (
		!cleaned || 
		cleaned.toLowerCase().endsWith('.vue') || 
		(componentName && cleaned.toLowerCase() === componentName.toLowerCase())
	) {
		return 'Docstrings Missing.';
	}

	return cleaned;
}

function resolveFilePath(impPath, sourceFileDir) {
	let resolvedPath = impPath;
	if (resolvedPath.startsWith('@/')) {
		resolvedPath = path.join(projectRoot, resolvedPath.replace('@/', 'src/'));
	} else {
		resolvedPath = path.resolve(sourceFileDir, resolvedPath);
	}
	
	if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
		return resolvedPath;
	}
	
	const extensions = ['.ts', '.js', '.vue', '.json'];
	for (const ext of extensions) {
		if (fs.existsSync(resolvedPath + ext)) {
			return resolvedPath + ext;
		}
	}
	
	return resolvedPath;
}

class MarkdownBuilder {
	constructor(currentSubFolder, fileInfoMap, componentName) {
		this.sections = [];
		this.currentSubFolder = currentSubFolder;
		this.fileInfoMap = fileInfoMap;
		this.componentName = componentName;
		this.currentFileDir = path.join(baseDocsDir, currentSubFolder);
	}

	addOverview(brief) {
		this.sections.push(`## Overview\n\n${sanitizeTableCell(brief)}`);
		return this;
	}

	addSourceLink(sourceFilePath) {
		let relPath = path.relative(this.currentFileDir, sourceFilePath);
		relPath = relPath.split(path.sep).join('/');
		this.sections.push(`**Source File:** [${path.basename(sourceFilePath)}](${relPath})`);
		return this;
	}

	addImportedComponents(components, sourceFileDir) {
		const content = components.length > 0 
			? components.map(imp => {
				const resolvedPath = resolveFilePath(imp.path, sourceFileDir);
				const targetInfo = this.fileInfoMap.get(path.resolve(resolvedPath));
				
				if (targetInfo) {
					const targetFilePath = path.join(baseDocsDir, targetInfo.subFolder, targetInfo.fileName);
					let relPath = path.relative(this.currentFileDir, targetFilePath);
					relPath = relPath.split(path.sep).join('/');
					return `- [${sanitizeTableCell(imp.name)}](${relPath})`;
				}

				let relPath = path.relative(this.currentFileDir, resolvedPath);
				relPath = relPath.split(path.sep).join('/');
				return `- [${sanitizeTableCell(imp.name)}](${relPath})`;
			}).join('\n')
			: '- *None specified*';

		this.sections.push(`## Imported Components\n\n${content}`);
		return this;
	}

	addImportedComposables(composables, sourceFileDir) {
		const content = composables.length > 0 
			? composables.map(imp => {
				const targetPath = resolveFilePath(imp.path, sourceFileDir);
				let relPath = path.relative(this.currentFileDir, targetPath);
				relPath = relPath.split(path.sep).join('/');
				return `- [${sanitizeTableCell(imp.name)}](${relPath})`;
			}).join('\n')
			: '- *None specified*';
		this.sections.push(`## Imported Composables\n\n${content}`);
		return this;
	}

	addImportedAssets(assets, sourceFileDir) {
		const content = assets.length > 0 
			? assets.map(imp => {
				const targetPath = resolveFilePath(imp.path, sourceFileDir);
				let relPath = path.relative(this.currentFileDir, targetPath);
				relPath = relPath.split(path.sep).join('/');
				return `- [${sanitizeTableCell(imp.name)}](${relPath})`;
			}).join('\n')
			: '- *None specified*';
		this.sections.push(`## Imported Assets\n\n${content}`);
		return this;
	}

	addProps(props) {
		let table = '| Prop Name | Type | Default | Possible Values | Description |\n| :-------- | :--- | :------ | :-------------- | :---------- |\n';
		if (props && props.length > 0) {
			props.forEach(prop => {
				const propName = sanitizeTableCell(prop.name);
				const type = sanitizeTableCell(prop.type?.name || 'String');
				
				let defaultValue = "''";
				if (prop.defaultValue?.value !== undefined) {
					defaultValue = String(prop.defaultValue.value);
				}
				defaultValue = sanitizeTableCell(defaultValue);
				
				let possibleValues = '-';
				if (prop.values && Array.isArray(prop.values) && prop.values.length > 0) {
					possibleValues = prop.values.join(', ');
				} else if (prop.tags) {
					if (Array.isArray(prop.tags)) {
						const valuesTag = prop.tags.find(t => t.title === 'values');
						if (valuesTag) {
							possibleValues = valuesTag.description || valuesTag.content || '-';
						}
					} else if (typeof prop.tags === 'object' && prop.tags !== null) {
						const valuesTag = prop.tags.values;
						if (valuesTag) {
							possibleValues = Array.isArray(valuesTag) 
								? valuesTag.map(v => v.description || v.content || v).join(', ') 
								: (valuesTag.description || valuesTag.content || valuesTag);
						}
					}
				}
				possibleValues = sanitizeTableCell(possibleValues);

				const desc = sanitizeTableCell(prop.description || '-');
				
				table += `| \`${propName}\` | ${type} | \`${defaultValue}\` | ${possibleValues} | ${desc} |\n`;
			});
		} else {
			table += '| *None* | - | - | - | - |\n';
		}
		this.sections.push(`## Props\n\n${table.trim()}`);
		return this;
	}

	addSectionList(title, items) {
		const cleanedItems = items ? items.map(item => ({
			name: item.name,
			description: cleanDocComment(item.description, this.componentName)
		})) : [];

		const content = cleanedItems.length > 0 
			? cleanedItems.map(item => `- \`${sanitizeTableCell(item.name)}\`: ${sanitizeTableCell(item.description)}`).join('\n')
			: '- *None specified*';
		this.sections.push(`## ${title}\n\n${content}`);
		return this;
	}

	build() {
		return this.sections.join('\n\n') + '\n';
	}
}

function getVueFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;
	const files = readdirSyncSafely(dir);
	files.forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			getVueFiles(filePath, fileList);
		} else if (filePath.endsWith('.vue')) {
			fileList.push(filePath);
		}
	});
	return fileList;
}

function readdirSyncSafely(dir) {
	try {
		return fs.readdirSync(dir);
	} catch {
		return [];
	}
}

function parseBriefTag(content) {
	const briefRegex = /@brief\s+([^\r\n*]+)/;
	const match = content.match(briefRegex);
	return match ? match[1].trim() : null;
}

function parseImports(content) {
    const importRegex = /import\s+([a-zA-Z0-9_-]+)\s+from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
        imports.push({ name: match[1], path: match[2] });
    }
    
    return imports;
}

function classifyImports(imports) {
    const components = [];
    const composables = [];
    const assets = [];

    imports.forEach(imp => {
        const lowerPath = imp.path.toLowerCase();
        const isComposable = lowerPath.includes('composables');
        const hasAssetExtension = /\.(png|jpg|jpeg|svg|gif|webp|css)$/.test(lowerPath);
        const isAssetFolder = lowerPath.includes('assets') || lowerPath.includes('img');
        const isAsset = hasAssetExtension || isAssetFolder;

        if (isComposable) {
            composables.push(imp);
        } else if (isAsset) {
            assets.push(imp);
        } else {
            components.push(imp);
        }
    });

    return { components, composables, assets };
}

function parseScriptSetupMembers(content) {
    const computedList = [];
    const methodsList = [];

    const lines = content.split(/\r?\n/);
    let currentCommentLines = [];
    let inComment = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed.startsWith('/**')) {
            inComment = true;
            currentCommentLines = [trimmed];
            if (trimmed.endsWith('*/')) {
                inComment = false;
            }
            continue;
        }

        if (inComment) {
            currentCommentLines.push(trimmed);
            if (trimmed.endsWith('*/')) {
                inComment = false;
            }
            continue;
        }

        if (currentCommentLines.length > 0) {
            const declMatch = trimmed.match(/^(?:export\s+)?(?:const|let|var|function|async\s+function)\s+([a-zA-Z0-9_$]+)/);
            if (declMatch) {
                const memberName = declMatch[1];
                const fullComment = currentCommentLines.join('\n');
                currentCommentLines = [];

                if (fullComment.includes('@file') || fullComment.includes('@brief')) {
                    continue;
                }

                let description = '';
                for (const cLine of fullComment.split('\n')) {
                    const cleanedLine = cLine.replace(/^\s*\*\s*/, '').replace(/\/\*\*?|\*\//g, '').trim();
                    if (cleanedLine && !cleanedLine.startsWith('@')) {
                        description = cleanedLine;
                        break;
                    }
                }

                let isComputed = memberName.startsWith('computed');
                for (let j = i; j < Math.min(i + 3, lines.length); j++) {
                    if (lines[j].includes('computed(')) {
                        isComputed = true;
                        break;
                    }
                }

                const item = { name: memberName, description };
                if (isComputed) {
                    computedList.push(item);
                } else {
                    methodsList.push(item);
                }
            } else if (trimmed === '' || trimmed.startsWith('//')) {
                continue;
            } else {
                currentCommentLines = [];
            }
        }
    }

    return { computedList, methodsList };
}

function generateIndexMarkdown(fileMetadata) {
	const categorized = {};

	fileMetadata.forEach(meta => {
		if (!categorized[meta.subFolder]) {
			categorized[meta.subFolder] = [];
		}
		categorized[meta.subFolder].push(meta);
	});

	let markdown = `# Component Index\n\n`;

	Object.keys(categorized).sort().forEach(category => {
		const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
		markdown += `## ${categoryTitle}\n\n`;
		markdown += `| Component | Description |\n`;
		markdown += `| :-------- | :---------- |\n`;

		const items = categorized[category].sort((a, b) => 
			a.componentName.localeCompare(b.componentName)
		);

		items.forEach(meta => {
			const fileName = `${meta.componentName.toLowerCase()}.md`;
			const relPath = `${meta.subFolder}/${fileName}`;
			const brief = parseBriefTag(meta.rawContent) || meta.docData.description || 'No description provided.';
			
			const componentLink = `[**${sanitizeTableCell(meta.componentName)}**](${relPath})`;
			const sanitizedBrief = sanitizeTableCell(brief);

			markdown += `| ${componentLink} | ${sanitizedBrief} |\n`;
		});

		markdown += `\n`;
	});

	if (!fs.existsSync(baseDocsDir)) {
		fs.mkdirSync(baseDocsDir, { recursive: true });
	}

	const indexPath = path.join(baseDocsDir, 'index.md');
	fs.writeFileSync(indexPath, markdown.trim() + '\n');
	console.log(`Generated component index table: ${indexPath}`);
}

async function generateMarkdown() {
	const vueFiles = getVueFiles(componentsDir);
	const fileMetadata = [];

	for (const file of vueFiles) {
		try {
			const rawContent = fs.readFileSync(file, 'utf-8');
			const docData = await parse(file);
			const componentName = docData.displayName || path.basename(file, '.vue');
			const relativePath = path.relative(componentsDir, file);
			const subFolder = relativePath.toLowerCase().includes('view') || relativePath.toLowerCase().includes('views') 
				? 'views' 
				: 'reusables';

			fileMetadata.push({
				file,
				rawContent,
				docData,
				componentName,
				subFolder
			});
		} catch (error) {
			console.error(`Error pre-parsing ${file}:`, error.message);
		}
	}

	const fileInfoMap = new Map();
	fileMetadata.forEach(meta => {
		fileInfoMap.set(path.resolve(meta.file), {
			subFolder: meta.subFolder,
			fileName: `${meta.componentName.toLowerCase()}.md`
		});
	});

	for (const meta of fileMetadata) {
		try {
			const { file, rawContent, docData, componentName, subFolder } = meta;
			const allImports = parseImports(rawContent);
			const { components, composables, assets } = classifyImports(allImports);
			const { computedList, methodsList } = parseScriptSetupMembers(rawContent);

			const customBrief = parseBriefTag(rawContent);
			const brief = customBrief || docData.description || 'No description provided.';

			const finalComputed = computedList.length > 0 ? computedList : [];
			const finalMethods = methodsList.length > 0 ? methodsList : (docData.methods || []);

			const markdownContent = new MarkdownBuilder(subFolder, fileInfoMap, componentName)
				.addOverview(brief)
				.addSourceLink(file)
				.addImportedComponents(components, path.dirname(file))
				.addImportedComposables(composables, path.dirname(file))
				.addImportedAssets(assets, path.dirname(file))
				.addProps(docData.props)
				.addSectionList('Computed Properties & Methods', finalComputed)
				.addSectionList('Slots', docData.slots)
				.addSectionList('Internal Methods', finalMethods)
				.build();

			const targetOutputDir = path.join(baseDocsDir, subFolder);
			if (!fs.existsSync(targetOutputDir)) {
				fs.mkdirSync(targetOutputDir, { recursive: true });
			}

			const outputFileName = `${componentName.toLowerCase()}.md`;
			fs.writeFileSync(path.join(targetOutputDir, outputFileName), markdownContent);
			console.log(`Generated (${subFolder}): ${componentName}`);

		} catch (error) {
			console.error(`Error processing ${file}:`, error.message);
		}
	}

	generateIndexMarkdown(fileMetadata);
}

generateMarkdown();