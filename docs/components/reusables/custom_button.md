## Overview

Customizable button component supporting icons, dynamic coloring, Vue Router navigation, external links, and press animations.

**Source File:** [custom_button.vue](../../../src/components/reusables/custom_button.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `disabled` | boolean | `false` | - | Disables interactions and reduces opacity when set to true. |
| `autoAdaptSize` | boolean | `false` | - | Automatically adapts the button size to wrap or fit text when it becomes long. |
| `text` | string | `''` | - | Label text displayed inside the button. |
| `iconSrc` | string | `''` | - | Image URL or raw inline SVG string for the button icon. |
| `iconPosition` | string | `'left'` | left, right, top, bottom | Position of the icon relative to the text. |
| `iconMargin` | number\|string | `null` | - | Custom margin/spacing applied specifically to the icon (e.g., '0 10px 0 0', '5px'). |
| `textMargin` | number\|string | `null` | - | Custom margin/spacing applied specifically to the text (e.g., '0 0 0 5px', '2px'). |
| `iconSize` | number\|string | `null` | - | Width and height dimension for the icon container (e.g., `24`, `'2rem'`, `'var(--icon-size)'`). |
| `iconColor` | string | `"var(--color-custom-icon)"` | - | Fill color for CSS mask-based icons. |
| `hoverIconColor` | string | `"var(--color-custom-icon-hover)"` | - | Hover fill color for CSS mask-based icons. |
| `border` | string | `'var(--custom-button-border)'` | - | CSS border applied to the button layout. |
| `padding` | string | `'clamp(0.35rem, 1vw, 0.5rem)'` | - | Inner padding spacing for the button container. |
| `width` | number\|string | `'fit-content'` | - | Custom width applied to the button layout. |
| `height` | number\|string | `'auto'` | - | Custom height applied to the button layout. |
| `fontSize` | number\|string | `'var(--custom-button-font-size)'` | - | Font size applied to the text string inside the button. |
| `bgColor` | string | `'var(--color-custom-button-background)'` | - | Background color of the button in default state. |
| `hoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Background color when hovering over the button. |
| `textColor` | string | `'var(--color-custom-button-text)'` | - | Text color of the button in default state. |
| `hoverTextColor` | string | `'var(--color-custom-button-text-hover)'` | - | Text color when hovering over the button. |
| `to` | string\|object | `null` | - | Vue Router target location for internal SPA navigation. |
| `externalUrl` | string | `null` | - | External URL to navigate to via window location. |
| `pressAnimation` | string | `'push'` | scale, lift, push, none | Active press animation transform style. |

## Computed Properties & Methods

- `processedIconSrc`: Formats raw inline SVG strings to data URIs or returns raw image paths.
- `hasValidColor`: Checks if valid dynamic icon colors exist for CSS mask rendering.
- `computedFlexDirection`: Computed flex direction mapping based on icon position.
- `computedWidth`: Computed width mapping based on autoAdaptSize and width prop.
- `computedHeight`: Computed height mapping.
- `cssIconSize`: Computed icon size dimension mapping.
- `cssIconWidth`: Computed icon container width/height mapping.
- `cssIconMargin`: Computed icon margin mapping.
- `cssFontSize`: Computed text font size mapping.
- `cssTextMargin`: Computed text margin mapping.
- `cssMaskImage`: Computed CSS mask URL for SVG icons.

## Slots

- `overriden-text`: Override the default button text content is ignored if the text prop is empty.

## Internal Methods

- `emit`: Triggered when the button is clicked by the user.
- `formatValue`: Helper to format value (number to px string).
- `handleClick`: Handles button click, emits event, and executes internal or external routing.
