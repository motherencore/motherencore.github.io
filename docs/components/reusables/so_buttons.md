## Overview

An operating system platform link/icon button component supporting custom masking, sizing, and clickability states.

**Source File:** [so_buttons.vue](../../../src/components/reusables/so_buttons.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `platform` | string | `''` | - | Target operating system platform identifier (e.g. windows, linux, mac). |
| `size` | number\|string | `48` | - | Dimension size for the platform icon. |
| `color` | string | `'var(--color-operational-system-icons-color)'` | - | Default fill color for the icon. |
| `hoverColor` | string | `'var(--color-operational-system-icons-hover-color)'` | - | Hover state fill color for the icon. |
| `url` | string | `''` | - | Custom override URL for the platform link. |
| `clickable` | boolean\|string | `true` | - | Controls whether the button behaves as an interactive link. |

## Computed Properties & Methods

- `isClickable`: Determines if the platform link is active/clickable.
- `resolvedUrl`: Resolves final target URL based on props and defaults.
- `iconSize`: Formats size value into pixel string if numeric.
- `iconMask`: Computes the SVG icon URL for CSS masking.

## Slots

- *None specified*

## Internal Methods

- `handleClick`: Prevents default navigation behavior if the button is marked unclickable.
