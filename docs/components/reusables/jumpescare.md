## Overview

Flashes an image overlay periodically based on frequency and chance.

**Source File:** [jumpescare.vue](../../../src/components/reusables/jumpescare.vue)

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | boolean | `''` | - | Controls visibility binding state of the jumpscare overlay. |
| `imageSrc` | string | `''` | - | Image source URL to display during the jumpscare flash. |
| `duration` | number | `1000` | - | Duration in milliseconds the image stays visible on screen. |
| `chance` | number | `50` | - | Probability percentage (0 to 100) that a jumpscare will trigger on each frequency check. |
| `frequency` | number | `1000` | - | Time interval in milliseconds between random check rolls (Default: 1000ms = 1 second). |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `triggerFlash`: Triggers the jumpscare image to show for the configured duration.
