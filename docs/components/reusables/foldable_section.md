## Overview

An accordion/foldable section component wrapping a content section with smooth collapse transition and auto-scroll capabilities.

**Source File:** [foldable_section.vue](../../../src/components/reusables/foldable_section.vue)

## Imported Components

- [ContentSection](content_section.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `title` | string | `''` | - | Header title text displayed on the toggle button. |
| `modelValue` | boolean | `undefined` | - | Controls the open or closed state of the foldable item externally via v-model. |
| `autoScroll` | boolean | `true` | - | Automatically scrolls the view to center this component when expanded. |
| `headerBg` | string | `'var(--foldable-header-bg)'` | - | Background color of the header element. |
| `titleColor` | string | `'var(--foldable-title-color)'` | - | Text color of the header title. |
| `bodyBg` | string | `'var(--foldable-body-bg)'` | - | Background color of the main body wrapper. |
| `arrowBgColor` | string | `'var(--foldable-icon-bg)'` | - | Background color of the icon container wrapper. |
| `arrowColor` | string | `'var(--foldable-icon-color)'` | - | Main fill color of the indicator arrow icon. |
| `outlineColor` | string | `'var(--foldable-icon-outline)'` | - | Outline shadow or border color of the indicator arrow icon. |
| `content` | string\|array | `() => []` | - | Text content passed down to the inner ContentSection component. |
| `headerPosition` | string | `'top'` | - | Position of the header relative to the content block. |
| `headingColor` | string | `''` | - | Color of the inner heading element. |
| `headingAlign` | string | `'center'` | - | Alignment of the inner heading text. |
| `textColor` | string | `'var(--foldable-text-color)'` | - | Text color applied inside the content block. |
| `contentBg` | string | `'#202020'` | - | Background color of the inner content block. |
| `borderRadius` | string | `'8px'` | - | Border radius applied to the inner content section. |
| `border` | string | `'3px solid #7a6c86'` | - | Outer border styling for the inner section. |
| `headerBorder` | string | `'transparent'` | - | Header border styling. |
| `textBorder` | string | `'none'` | - | Text section border styling. |
| `mediaBorder` | string | `''` | - | Media block border styling. |
| `mediaBorderRadius` | string | `''` | - | Media block border radius styling. |
| `textAlign` | string | `'left'` | - | Text alignment inside the content block. |
| `sectionPadding` | string | `'16px 20px'` | - | Padding spacing for the content section container. |
| `textPadding` | string | `'0px'` | - | Padding spacing specifically for the text container. |
| `mediaSrc` | string | `''` | - | Media asset source URL. |
| `mediaAlt` | string | `''` | - | Alternative descriptive text for media elements. |
| `mediaCaption` | string | `''` | - | Caption text displayed alongside media elements. |
| `mediaWidth` | string | `'535px'` | - | Width dimension configuration for media elements. |
| `mediaHeight` | string | `'auto'` | - | Height dimension configuration for media elements. |
| `mediaType` | string | `'text'` | - | Type classification of the media element. |
| `mediaPosition` | string | `'right'` | - | Alignment/position layout of media relative to text. |
| `layout` | string | `'horizontal'` | - | General arrangement layout mode. |
| `imageOpenable` | boolean | `true` | - | Determines if inner images can be opened/zoomed. |

## Computed Properties & Methods

- *None specified*

## Slots

- `media`: Custom media content slot
- `default`: Slot for main inner body content

## Internal Methods

- `scrollToSelf`: Scrolls the window smoothly to center this component into view.
- `toggleFold`: Toggles the open/closed state of the foldable item and handles events.
