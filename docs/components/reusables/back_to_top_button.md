## Overview

A floating back-to-top button component with smooth/instant scrolling behavior.

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
| *None* | - | - | - | - |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `isVisible`: Controls button visibility based on vertical scroll offset.
- `handleScroll`: Handles window scroll events to toggle visibility.
- `scrollToTop`: Scrolls the window back to the top instantly if motion is reduced, or smoothly otherwise.
