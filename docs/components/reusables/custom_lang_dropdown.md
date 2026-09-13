## Overview

A language selector dropdown component utilizing i18n composables, toggling language options, and handling click-outside dismissals.

**Source File:** [custom_lang_dropdown.vue](../../../src/components/reusables/custom_lang_dropdown.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_triangle_down](../../../src/assets/svg/triangle-down-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| *None* | - | - | - | - |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `isOpen`: Tracks whether the language options menu is open.
- `dropdownRef`: Reference to the root container DOM element for click-outside tracking.
- `toggleDropdown`: Toggles the visibility state of the language dropdown menu.
- `selectLanguage`: Selects a new language code and closes the dropdown.
- `closeOnClickOutside`: Closes the dropdown menu if a click occurs outside the language selector container.
