## Overview

A customizable toast notification component supporting multiple positions, types, auto-dismiss timers, progress bars, and custom buttons.

**Source File:** [notification_toaster.vue](../../../src/components/reusables/notification_toaster.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_close](../../../src/assets/svg/close-svgrepo-com.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | boolean | `''` | - | Controls the visibility state of the notification toast. |
| `message` | string | `'Default toaster notification!'` | - | Text message to display inside the notification. |
| `icon` | string | `'@/assets/img/characters/ninten_head_sprite.png'` | - | Source path or URL for the notification icon. |
| `position` | string | `'top-right'` | top-right, top-left, top-center, bottom-right, bottom-left, bottom-center | Screen position where the toaster appears. |
| `type` | string | `'info'` | info, success, warning, error | Visual type/theme of the notification. |
| `duration` | number | `4000` | - | Duration in milliseconds before the toast automatically dismisses. |
| `showProgressBar` | boolean | `true` | - | Controls whether the animated countdown progress bar is visible. |
| `dismissible` | boolean | `true` | - | Controls whether the manual close/dismiss button is displayed. |

## Computed Properties & Methods

- `visible`: Computed wrapper for v-model visibility binding.
- `positionClass`: Computes the CSS position class name.
- `typeClass`: Computes the CSS theme type class name.
- `transitionName`: Computes the transition animation name based on screen position.

## Slots

- `icon`: Slot to override the default notification icon
- `toaster_message_text`: Slot for custom message text

## Internal Methods

- `startTimer`: Starts the auto-dismiss timer based on the configured duration.
- `closeToast`: Closes the toast notification and triggers cleanup events.
