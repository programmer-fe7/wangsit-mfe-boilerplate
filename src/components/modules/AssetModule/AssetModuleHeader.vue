<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import {
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Button,
  DialogConfirm,
  eventBus,
} from '@fewangsit/wangsvue';
import DialogEditRegisterAsset from './DialogEditRegisterAsset/DialogEditRegisterAsset.vue';
import { Asset } from '@/types/asset.type';

const dataSelected = shallowRef<Asset[]>([]);
const showDeleteAssetDialog = shallowRef<boolean>(false);
const showRegisterAssetDialog = shallowRef<boolean>(false);

const bulkAction: MenuItem[] = [
  {
    label: 'Delete Asset',
    icon: 'checkbox-blank-circle',
    danger: false,
    command: (): void => {
      showDeleteAssetDialog.value = true;
    },
  },
];

const changeRegisterAssetDialogVisibilityState = (): void => {
  showRegisterAssetDialog.value = !showRegisterAssetDialog.value;
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonBulkAction
      v-model:selected-data="dataSelected"
      :options="bulkAction"
      table-name="asset-list"
    />
    <ButtonSearch class="ml-auto" table-name="asset-list" />
    <ButtonDownload file-name="Download" table-name="asset-list" />
    <ButtonFilter table-name="asset-list" />
    <Button
      :outlined="false"
      @click="changeRegisterAssetDialogVisibilityState"
      icon="add"
      icon-pos="left"
      label="Register"
      rounded
      severity="secondary"
    />
  </div>

  <DialogConfirm
    v-model:visible="showDeleteAssetDialog"
    :list="dataSelected"
    @confirm="eventBus.emit('data-table:update', { tableName: 'asset-list' })"
    actionable
    confirm-label="Yakin"
    header="Delete Asset"
    header-icon="delete-bin-7"
    list-label="name"
    severity="danger"
  />

  <DialogEditRegisterAsset
    v-model:visible="showRegisterAssetDialog"
    :selected-asset="undefined"
    list-label="name"
  />
</template>
