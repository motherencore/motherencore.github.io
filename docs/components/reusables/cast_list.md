## Overview

Displays a showcase list or tabbed view of characters with portrait navigation and transition support.

**Source File:** [cast_list.vue](../../../src/components/reusables/cast_list.vue)

## Imported Components

- [CharacterCard](character_card.md)

## Imported Composables

- *None specified*

## Imported Assets

- [imgNintenPortrait](../../../src/assets/img/characters/ninten_head_sprite.png)
- [imgNinten](../../../src/assets/img/characters/ninten_with_outline.png)
- [imgLloydPortrait](../../../src/assets/img/characters/lloyd_head_sprite.png)
- [imgLloyd](../../../src/assets/img/characters/lloyd_with_outline.png)
- [imgAnaPortrait](../../../src/assets/img/characters/ana_head_sprite.png)
- [imgAna](../../../src/assets/img/characters/ana_with_outline.png)
- [imgTeddyPortrait](../../../src/assets/img/characters/teddy_head_sprite.png)
- [imgTeddy](../../../src/assets/img/characters/teddy_with_outline.png)
- [svgTriangle](../../../src/assets/svg/triangle-right-12-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `viewType` | string | `'list'` | list, tab | Layout display mode for characters. |
| `transitionType` | string | `'fade'` | - | Animation transition type used when switching tabs. |

## Computed Properties & Methods

- `triangleUrl`: Formats the triangle SVG path for CSS mask usage.
- `characters`: Reactive collection of game characters with localized text and assets.

## Slots

- *None specified*

## Internal Methods

- *None specified*
