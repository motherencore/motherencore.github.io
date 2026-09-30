## Overview

A text list carousel component featuring slides of feature lists, custom pagination indicators, and custom navigation buttons.

**Source File:** [list_text_carroulsel.vue](../../../src/components/reusables/list_text_carroulsel.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_left_arrow](../../../src/assets/svg/triangle-left-12-filled.svg)
- [img_right_arrow](../../../src/assets/svg/triangle-right-12-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `title` | string | `'GAME FEATURES'` | - | Title header text displayed above the carousel. |
| `features` | array | `[]` | - | Array of feature lists displayed across carousel slides. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `currentIndex`: Tracks the active slide index of the carousel.
- `nextSlide`: Advances the carousel to the next slide.
- `prevSlide`: Moves the carousel to the previous slide.
- `goToSlide`: Directly navigates the carousel to a specific slide index.
