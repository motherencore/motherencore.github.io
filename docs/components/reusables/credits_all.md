## Overview

The master credits container component that parses CSV files for roles and links, formatting localized credit lists for display.

**Source File:** [credits_all.vue](../../../src/components/reusables/credits_all.vue)

## Imported Components

- [CreditsSection](credits_section.md)

## Imported Composables

- *None specified*

## Imported Assets

- [rolesCSVText](../../../src/assets/csv/credits_roles.csv?raw)
- [linksCSVText](../../../src/assets/csv/credits_links.csv?raw)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `act` | string | `'all'` | - | The act filter string ('all' or specific act number). |

## Computed Properties & Methods

- `specialCredits`: Special static credits block for thanks, community, and contributor notices.
- `linksMap`: Generates a lookup dictionary mapping names to external links from the parsed links CSV.
- `formattedCredits`: Formats the raw CSV role data and links into structured credit groups based on the active act filter.

## Slots

- *None specified*

## Internal Methods

- `splitCSVLine`: Robust RFC-4180 safe CSV line splitter.
- `parseCSV`: Parses raw CSV text into structured JavaScript objects.
