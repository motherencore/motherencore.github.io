## Overview

Reusable social media link button component featuring dynamic SVG icons and a hover tooltip.

**Source File:** [social_media_button.vue](../../../src/components/reusables/social_media_button.vue)

## Imported Components

- [ToolTip](tooltip.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `platform` | string | `''` | - | The social network platform identifier (e.g. 'twitter', 'discord'). |
| `tooltipText` | string | `null` | - | Custom text string override for the tooltip. |
| `showTooltip` | boolean | `true` | - | Flag indicating whether the tooltip should display. |
| `toolTipPosition` | string | `'top'` | - | Position of the tooltip relative to the icon button. |
| `size` | number\|string | `48` | - | Dimension size value for the icon button width and height. |
| `color` | string | `'var(--color-social-icons-color, inherit)'` | - | Default CSS color string. |
| `hoverColor` | string | `'var(--color-social-icons-hover-color, inherit)'` | - | Hover state CSS color string. |

## Computed Properties & Methods

- `computedTooltipText`: Computed text string rendered inside the tooltip component.
- `cssSize`: Resolved CSS unit size string computed from props.size.
- `cssMask`: Resolved SVG mask URL path computed from platform key.
- `isTooltipVisible`: Computed flag validating if the component tooltip should be visible.

## Slots

- *None specified*

## Internal Methods

- `linkRef`: Reference object bound to the interactive link element.
- `key`: Normalized platform string key.
- `platforms`: Registry collection mapping platform names to target URLs and display labels.
- `platformInfo`: Resolved platform dataset object fallback configuration.
- `socialIcons`: Eager glob import map resolving SVG asset files.
- `internalShow`: Internal reactive visibility state toggle flag.
- `tooltipTimer`: Identifier reference for active asynchronous tooltip display timers.
- `handleMouseEnter`: Event handler triggered upon mouse entering the button container area.
- `handleMouseLeave`: Event handler triggered upon mouse leaving the button container area.
