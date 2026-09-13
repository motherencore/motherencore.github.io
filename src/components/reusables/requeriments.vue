<template>
  <div class="requirements-container">
    <table class="requirements-table">
      <tbody>
        <tr v-for="item in requirements" :key="item.key">
          <td class="requirement-label">{{ t(item.key) }}</td>
          <td class="requirement-value">{{ t(item.value) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/**
  * @file        requeriments.vue
  * @brief       A system requirements display component using a responsive localized tabular layout.
  * @displayName Requirements Table
*/

import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

/**
  * List of system requirements keys mapping to internationalization labels.
  * @private
  */
const requirements = ref([
  { key: 'SITE_DOWNLOAD_REQ_OS',        value: 'SITE_DOWNLOAD_REQ_OS_DETAILS' },
  { key: 'SITE_DOWNLOAD_REQ_RAM',       value: 'SITE_DOWNLOAD_REQ_RAM_DETAILS' },
  { key: 'SITE_DOWNLOAD_REQ_VIDEO',     value: 'SITE_DOWNLOAD_REQ_VIDEO_DETAILS' },
  { key: 'SITE_DOWNLOAD_REQ_LANGUAGES', value: 'SITE_DOWNLOAD_REQ_LANGUAGES_DETAILS' }
])
</script>

<style scoped>
.requirements-container {
  width           : 100%;
  max-width       : 100%;
  font-family     : var(--font-h3);
  font-size       : var(--font-h3-size);
  background-color: var(--color-requiriments-key-background);
  border-radius   : 30px;
  border          : var(--color-requiriments-container-border);
  overflow        : hidden; 
}

.requirements-table {
  width           : 100%;
  border-collapse : separate;
  border-spacing  : 0;
  color           : var(--color-requiriments-key-text);
}

.requirements-table td {
  padding         : 14px 16px;
  vertical-align  : middle;
}

.requirements-table tr:first-child .requirement-label {
  border-top-left-radius: 27px;
}

.requirements-table tr:first-child .requirement-value {
  border-top-right-radius: 27px;
}

.requirements-table tr:last-child .requirement-label {
  border-bottom-left-radius: 27px;
}

.requirements-table tr:last-child .requirement-value {
  border-bottom-right-radius: 27px;
}

.requirement-label {
  color                 : var(--color-requiriments-key-text);
  width                 : 25%;
  background-color      : var(--color-requiriments-key-background);
  font-weight           : bold;
  border-bottom         : var(--color-requiriments-key-border-bottom);
}

.requirement-value {
  color                 : var(--color-requiriments-value-text);  
  width                 : 75%;
  background-color      : var(--color-requiriments-value-background);
  line-height           : 1.4;
  border-bottom         : var(--color-requiriments-value-border-bottom);
}

.requirements-table tr:last-child .requirement-label,
.requirements-table tr:last-child .requirement-value {
  border-bottom         : none;
}

@media screen and (max-width: 768px) {
  .requirements-container {
    width               : calc(100% - 32px);
    margin-left         : auto;
    margin-right        : auto;
  }

  .requirements-table,
  .requirements-table tbody,
  .requirements-table tr,
  .requirements-table td {
    display             : block;
    width               : 100% !important;
    box-sizing          : border-box;
  }

  .requirements-table tr:first-child .requirement-label,
  .requirements-table tr:first-child .requirement-value,
  .requirements-table tr:last-child .requirement-label,
  .requirements-table tr:last-child .requirement-value {
    border-radius       : 0;
  }

  .requirements-table tr:first-child .requirement-label {
    border-top-left-radius  : 27px;
    border-top-right-radius : 27px;
  }

  .requirements-table tr:last-child .requirement-value {
    border-bottom-left-radius  : 27px;
    border-bottom-right-radius : 27px;
  }

  .requirements-table tr {
    border-bottom       : var(--color-requiriments-mobile-row-border-bottom);
  }

  .requirements-table tr:last-child {
    border-bottom       : none;
  }

  .requirement-label {
    border-bottom       : none;
  }
}
</style>