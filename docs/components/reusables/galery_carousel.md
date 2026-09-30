## Overview

Interactive image gallery component supporting automatic rotation, animated GIFs,

**Source File:** [galery_carousel.vue](../../../src/components/reusables/galery_carousel.vue)

## Imported Components

- [MediaModal](media_modal.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_left_arrow](../../../src/assets/svg/triangle-left-12-filled.svg)
- [img_right_arrow](../../../src/assets/svg/triangle-right-12-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `intervalTime` | number | `1000` | - | Time in milliseconds before advancing to the next slide automatically. |
| `imageModules` | object | `{}` | - | Key-value object dictionary of imported image/GIF source URLs. |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed. |
| `disableSelect` | boolean | `true` | - | Disables text selection across gallery elements. |

## Computed Properties & Methods

- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.
- `currentModalMediaItem`: Computed property providing active media details for the viewer modal.

## Slots

- `slide-image`: Custom slot for rendering slide images

## Internal Methods

- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
- `handleTouchStart`: Captures initial touch horizontal coordinate on touch start.
- `handleTouchEnd`: Captures ending touch coordinate on touch end and triggers swipe evaluation.
- `handleSwipe`: Evaluates touch displacement against a threshold to determine swipe direction.
- `captureFirstFrame`: Renders the first frame of an animated GIF onto an offscreen canvas to generate a static data URL.
- `resetTimer`: Restarts auto-advance rotation timer and resets the progress bar animation state.
- `nextSlide`: Advances carousel forward to the next slide index.
- `prevSlide`: Navigates carousel backward to the previous slide index.
- `selectSlide`: Selects a specific slide index directly.
- `scrollThumbnails`: Scrolls the thumbnail strip horizontally based on scroll direction.
- `openModal`: Opens expanded image modal view and prevents document scrolling.
- `closeModal`: Closes image modal view and restores document scrolling.
