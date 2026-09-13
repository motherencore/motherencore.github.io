## Overview

The primary site navigation bar component containing route links, custom button hamburger menu with smooth rotation animations, and an optional language dropdown selector.

**Source File:** [navigation_component.vue](../../../src/components/reusables/navigation_component.vue)

## Imported Components

- [CustomLanguageDropdown](custom_lang_dropdown.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_hamburguer_icon_closed](../../../src/assets/svg/hamburger-button.svg)
- [img_hamburguer_icon_open](../../../src/assets/svg/triangle-down-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `showLanguageDropdown` | boolean | `true` | - | Controls whether the language selection dropdown is visible in the navigation bar. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `isMenuOpen`: Tracks whether the mobile hamburger menu is open.
- `toggleMenu`: Toggles the mobile menu open/closed state.
- `handleNavClick`: Scrolls the page to the top immediately or smoothly depending on the reduced motion preference.
