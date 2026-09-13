## Overview

Application footer component featuring a brand logo, navigation links,

**Source File:** [app_footer.vue](../../../src/components/reusables/app_footer.vue)

## Imported Components

- [NavigationComponent](navigation_component.md)
- [SocialMediaButton](social_media_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality on the footer logo. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed on the logo. |
| `disableSelect` | boolean | `true` | - | Disables text and element selection on the footer logo. |

## Computed Properties & Methods

- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.

## Slots

- *None specified*

## Internal Methods

- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
