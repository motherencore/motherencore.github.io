## Overview

Media modal component for displaying enlarged images or videos with custom navigation buttons.

**Source File:** [media_modal.vue](../../../src/components/reusables/media_modal.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_left_arrow](../../../src/assets/svg/triangle-left-12-filled.svg)
- [img_right_arrow](../../../src/assets/svg/triangle-right-12-filled.svg)
- [img_close](../../../src/assets/svg/close-svgrepo-com.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isOpen` | boolean | `false` | - | Controls whether the modal overlay is active and visible. |
| `mediaItem` | object | `{}` | - | Object containing the type, source URL, and alternative description text of the media asset. |
| `showNav` | boolean | `true` | - | Controls whether the left and right navigation arrows are visible. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- *None specified*
