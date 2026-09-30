## Overview

A customizable credits section component featuring grouped roles, names, grid layout columns, dynamic links, and tooltip.

**Source File:** [credits_section.vue](../../../src/components/reusables/credits_section.vue)

## Imported Components

- [ToolTip](tooltip.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `credits` | array | `''` | - | Array of credit sections containing titles and grouped role lists. |
| `linksMap` | object | `{}` | - | Mapping dictionary of names and external links. |
| `titleColor` | string | `'var(--color-credits-title)'` | - | Text color for main section titles. |
| `subtitleColor` | string | `'var(--color-credits-role)'` | - | Text color for group roles/subtitles. |
| `textColor` | string | `'var(--color-credits-name)'` | - | Text color for individual names. |
| `columns` | number\|string | `2` | - | Number of grid columns for the names list. |
| `textAlign` | string | `'left'` | left, center, right | Text alignment orientation ('left', 'center', 'right'). |

## Computed Properties & Methods

- `computedAlign`: Computes grid justification based on text alignment configuration.

## Slots

- *None specified*

## Internal Methods

- `resolveName`: Extracts string name from string or object person entries.
- `resolveLink`: Resolves link mapping for a person string.
- `getPersonLink`: Gets specific link or fallback resolved link for a person.
- `isTooltipAllowed`: Determines if tooltips are permitted based on config hierarchy.
