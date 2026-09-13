## Overview

Character card component supporting image customization, description paragraphs,

**Source File:** [character_card.vue](../../../src/components/reusables/character_card.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `name` | string | `''` | - | Character name text content. |
| `description` | string\|array | `''` | - | Description text string or an array of description paragraphs. |
| `image` | string | `''` | - | Source URL for the character image asset. |
| `isReversed` | boolean | `false` | - | Controls whether the card layout direction is reversed. |
| `orientation` | string | `'horizontal'` | horizontal, vertical | Layout orientation of the character card (horizontal, vertical). |
| `imageShape` | string | `'circle'` | circle, square | Shape style of the character image wrapper (circle, square). |
| `imageBgColor` | string | `'transparent'` | - | Background color for the image wrapper container. |
| `imageSize` | string | `'340px'` | - | Custom CSS size width and height for the image wrapper. |
| `imageScale` | number\|string | `1` | - | Scale factor transformation applied to the character image. |
| `imagePadding` | string | `"0 0 70px 0"` | - | Inner padding spacing applied to the character image. |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed. |
| `disableSelect` | boolean | `true` | - | Disables text selection across element text/images. |

## Computed Properties & Methods

- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.
- `descriptionParagraphs`: Computed property that normalizes the description prop into an array.

## Slots

- *None specified*

## Internal Methods

- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
