<script setup lang="ts">
import { DialogConfirm, eventBus } from '@fewangsit/wangsvue';
import { DialogConfirmProps } from '@fewangsit/wangsvue/components/dialogconfirm/DialogConfirm.vue.d';

defineProps<
  Omit<DialogConfirmProps, 'header' | 'severity' | 'closeAfterConfirm'>
>();

const visible = defineModel<boolean>('visible', { default: false });
</script>

<template>
  <DialogConfirm
    v-bind="$props"
    v-model:visible="visible"
    @confirm="eventBus.emit('data-table:update', {})"
    actionable
    confirm-label="Yakin"
    header="Delete Asset"
    header-icon="delete-bin-7"
    severity="danger"
  />
</template>
