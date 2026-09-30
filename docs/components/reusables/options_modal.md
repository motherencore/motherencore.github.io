## Overview

A modal dialog component that manages and persists toggleable options via sessionStorage with cross-tab sync support.

**Source File:** [options_modal.vue](../../../src/components/reusables/options_modal.vue)

## Imported Components

- [ToggleButton](toggle_button.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [closeIcon](../../../src/assets/svg/close-svgrepo-com.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | boolean | `false` | - | Controls the visibility state of the modal externally via v-model. |
| `title` | string | `'Settings / Options'` | - | Header title text displayed inside the modal window. |
| `options` | array | `''` | - | Array of option configuration objects containing keys and labels. |
| `width` | number\|string | `400` | - | Width dimension configuration for the modal panel. |
| `bgColor` | string | `'var(--color-custom-button-background)'` | - | Background color of the modal panel. |
| `hoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color configuration (reserved for potential panel states). |
| `activeBgColor` | string | `'var(--color-hover)'` | - | Active background color configuration (reserved for potential panel states). |
| `textColor` | string | `'var(--color-custom-button-text)'` | - | Text color applied inside the modal panel. |

## Computed Properties & Methods

- `widthVal`: Formats width value into pixel string if numeric.

## Slots

- *None specified*

## Internal Methods

- `syncSessionState`: Synchronizes reactive session state with current sessionStorage values.
- `toggleOption`: Updates option state, persists to sessionStorage, dispatches update events, and emits changes.
- `closeModal`: Closes the modal by updating v-model state.
