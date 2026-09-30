## Overview

A customizable dropdown component supporting v-model selection, click-outside closing behavior, and animated arrow icons.

**Source File:** [custom_dropdown.vue](../../../src/components/reusables/custom_dropdown.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | string\|number | `''` | - | Current selected value bound via v-model. |
| `options` | array | `''` | - | List of selectable options containing id and label properties. |

## Computed Properties & Methods

- `selectedLabel`: Computes the display label for the currently selected option.

## Slots

- *None specified*

## Internal Methods

- `isOpen`: Tracks whether the dropdown option list is expanded.
- `dropdownRef`: Reference to the root dropdown container DOM element.
- `selectOption`: Handles selection of an option and closes the dropdown.
- `closeDropdown`: Closes the dropdown if a click event occurs outside of the component.
