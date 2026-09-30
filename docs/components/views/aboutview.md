## Overview

About page view component displaying structured informational content sections with alternating media layouts.

**Source File:** [AboutView.vue](../../../src/components/views/AboutView.vue)

## Imported Components

- [ContentSection](../reusables/content_section.md)
- [CustomButton](../reusables/custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [musicNoteSvg](../../../src/assets/svg/music-note-4-svgrepo-com.svg)
- [combatMedia](../../../src/assets/mp4/showreels/Combat.mp4)
- [fieldMedia](../../../src/assets/mp4/showreels/Field Skills & Dungeons.mp4)
- [storyMedia](../../../src/assets/mp4/showreels/Story.mp4)
- [visualMedia](../../../src/assets/mp4/showreels/Panning.mp4)
- [musicMedia](../../../src/assets/mp4/showreels/Music.mp4)
- [godotImage](../../../src/assets/img/logos/logo_large_monochrome_light.png)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| *None* | - | - | - | - |

## Computed Properties & Methods

- `infoSections_1`: Computes the list of information sections displayed sequentially across the about page.

## Slots

- *None specified*

## Internal Methods

- `openMusicPlayer`: Open/Close the music player when clicked
