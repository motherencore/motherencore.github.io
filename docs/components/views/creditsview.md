## Overview

Credits view component use Credits Section component to display credits for the selected act.

**Source File:** [CreditsView.vue](../../../src/components/views/CreditsView.vue)

## Imported Components

- [CreditsSection](../reusables/credits_all.md)
- [CustomDropdown](../reusables/custom_dropdown.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| *None* | - | - | - | - |

## Computed Properties & Methods

- `availableActs`: Computes the list of available act options for the dropdown selector.

## Slots

- *None specified*

## Internal Methods

- `currentAct`: Tracks the currently selected act identifier for the credits filter.
