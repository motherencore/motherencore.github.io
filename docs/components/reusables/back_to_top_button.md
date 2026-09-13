## Overview

A floating back-to-top button component with dynamic footer overlap handling and smooth/instant scrolling behavior.

**Source File:** [back_to_top_button.vue](../../../src/components/reusables/back_to_top_button.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [triangleIcon](../../../src/assets/svg/triangle-up-12-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `footerBehavior` | string | `'stay'` | center, stay, hide, overlap | Defines how the button behaves when overlapping with the page footer ('center', 'stay', 'hide', 'overlap'). |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `isVisible`: Controls button visibility based on vertical scroll offset.
- `isHidden`: Controls button hidden state during footer collision/overlap.
- `buttonBottom`: Dynamic bottom spacing value in pixels.
- `handleScroll`: Handles window scroll events to toggle visibility and check footer overlap.
- `handleFooterOverlap`: Computes footer bounding rectangles to adjust position when overlapping the footer.
- `scrollToTop`: Scrolls the window back to the top instantly if motion is reduced, or smoothly otherwise.
