## Overview

Application header component containing the logo and navigation component.

**Source File:** [app_header.vue](../../../src/components/reusables/app_header.vue)

## Imported Components

- [NavigationComponent](navigation_component.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `activePage` | string | `'Home'` | - | The currently active navigation page name. |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality on the header logo. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed on the logo. |
| `disableSelect` | boolean | `true` | - | Disables text and element selection on the header logo. |

## Computed Properties & Methods

- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.

## Slots

- *None specified*

## Internal Methods

- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
