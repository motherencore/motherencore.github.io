## Overview

Gallery view component displaying the worst of Encore

**Source File:** [DogtenView.vue](../../../src/components/views/DogtenView.vue)

## Imported Components

- [Banner](../reusables/banner.md)
- [MediaGallery](../reusables/mansory_gallery.md)
- [MediaModal](../reusables/media_modal.md)
- [CustomButton](../reusables/custom_button.md)
- [OptionsModal](../reusables/options_modal.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| *None* | - | - | - | - |

## Computed Properties & Methods

- `modalOptions`: Computed list of options for the options modal.

## Slots

- *None specified*

## Internal Methods

- `funnyModules`: Glob loader for funny media assets.
- `mapRenderImagesGlob`: Glob loader for map render background images.
- `mediaOrderConfig`: Static media order and metadata configurations.
- `sampleMediaItems`: Filtered and mapped collection of active media items.
- `isOptionsModalOpen`: Tracks visibility states for modals and carousel active indices.
- `openModal`: Opens the media viewer modal for a specified media item.
- `closeModal`: Closes the media viewer modal.
- `nextMedia`: Advances the media viewer to the next item.
- `prevMedia`: Moves the media viewer back to the previous item.
- `handleModalChange`: Handles changes made within the options modal.
