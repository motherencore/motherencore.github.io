## Overview

Floating animated musical notes animation component with random colors, customizable speed, and float trajectory distance.

**Source File:** [music_player_floating_notes.vue](../../../src/components/reusables/music_player_floating_notes.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `active` | boolean | `true` | - | Controls the visibility and active state of the floating notes animation. |
| `isRandomColor` | boolean | `true` | - | Determines whether notes pick a random color from the provided palette array. |
| `colors` | array | `[   'var(--color-place-holder-green)' ]` | - | Array of available color strings for the floating notes. |
| `fallbackColor` | string | `'var(--color-place-holder-green)'` | - | Fallback color used when random coloring is disabled or the palette is empty. |
| `distance` | string\|number | `'-50px'` | - | Vertical float travel distance for the animation trajectory. |
| `speed` | string\|number | `'2s'` | - | Duration or speed of the floating animation cycle. |

## Computed Properties & Methods

- `computedDistance`: Formatted vertical float distance with unit support.
- `computedSpeed`: Formatted animation speed duration with unit support.

## Slots

- *None specified*

## Internal Methods

- `noteColors`: Stores the current active colors assigned to the rendered notes.
- `getRandomColor`: Selects a random color from the color palette or falls back appropriately.
- `refreshColors`: Refreshes the color array with newly randomized colors for each note.
