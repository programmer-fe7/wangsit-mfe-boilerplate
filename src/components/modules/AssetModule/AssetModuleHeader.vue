<script setup lang="ts">
import {
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Button,
  DialogConfirm,
  eventBus,
} from '@fewangsit/wangsvue';

import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import { Asset } from '@/types/asset.type';

import DialogEditRegisterAsset from './DialogEditRegisterAsset/DialogEditRegisterAsset.vue';
import AssetServices from '@/components/services/asset.service';

const bulkAction: MenuItem[] = [
  {
    label: 'Delete Asset',
    icon: 'checkbox-blank-circle',
    danger: false,
    command: (): void => {
      showDeleteDialog.value = true;
    },
  },
];

const assetSelected = shallowRef<Asset[]>([]);
const showDeleteDialog = shallowRef<boolean>(false);
const showRegisterDialog = shallowRef<boolean>(false);

const changeRegisterAssetDialogVisibilityState = (): void => {
  showRegisterDialog.value = !showRegisterDialog.value;
};

const confirmDeletion = async (): Promise<void> => {
  try {
    for (const asset of assetSelected.value) {
      await AssetServices.deleteAsset({ _id: asset._id });
    }
    eventBus.emit('data-table:update', { tableName: 'asset-list' });
  } catch (error) {
    console.error('Error while deleting asset:', error);
  }
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonBulkAction
      v-model:selected-data="assetSelected"
      :options="bulkAction"
      table-name="asset-list"
    />
    <ButtonSearch class="ml-auto" table-name="asset-list" />
    <ButtonDownload file-name="Download" table-name="asset-list" />
    <ButtonFilter table-name="asset-list" />
    <!--
      TODO: The button below will always show the dialog, so just change it to
      `canShowRegisterAssetDialog = true`. No need for a new function.
    -->
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
    v-model:visible="showDeleteDialog"
    :list="assetSelected"
    @confirm="confirmDeletion"
    actionable
    confirm-label="Yakin"
    header="Delete Asset"
    header-icon="delete-bin-7"
    list-label="name"
    severity="danger"
  />

  <DialogEditRegisterAsset
    v-model:visible="showRegisterDialog"
    :selected-asset="undefined"
    list-label="name"
  />
</template>
