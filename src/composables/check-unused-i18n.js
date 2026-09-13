import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'

function getExcelKeys(filePath) {
	const sheets = XLSX.readFile(filePath)
	const keys = new Set()

	sheets.SheetNames.forEach(sheetName => {
		const sheet = sheets.Sheets[sheetName]
		const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })
		rows.forEach(row => {
			const keyField = Object.keys(row).find(k => k.toLowerCase() === 'key')
			if (row[keyField]) keys.add(String(row[keyField]).trim())
		})
	})
	return keys
}

function getFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir)
	files.forEach(file => {
		const filePath = path.join(dir, file)
		if (fs.statSync(filePath).isDirectory()) {
			getFiles(filePath, fileList)
		} else if (file.endsWith('.vue') || file.endsWith('.js')) {
			fileList.push(filePath)
		}
	})
	return fileList
}

const excelKeys = getExcelKeys('./src/assets/xlsx/translations.xlsx')
const codeFiles = getFiles('./src')
const unusedKeys = new Set(excelKeys)

codeFiles.forEach(file => {
	const content = fs.readFileSync(file, 'utf-8')
	excelKeys.forEach(key => {
		if (content.includes(key)) {
			unusedKeys.delete(key)
		}
	})
})

console.log('Unused Keys:', Array.from(unusedKeys))