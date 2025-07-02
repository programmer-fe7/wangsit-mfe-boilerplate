<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import {
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
  Button,
} from '@fewangsit/wangsvue';
import DialogDeleteAsset from './DialogDeleteAsset/DialogDeleteAsset.vue';
import DialogRegisterAsset from './DialogRegisterAsset/DialogRegisterAsset.vue';
import { Asset } from '@/types/asset.type';

const dataSelected = shallowRef<Asset[]>([]);
// FIXME: All shallowRefs must have a type, so this one is <boolean>
const showDeleteAssetDialog = shallowRef(false);
const showRegisterAssetDialog = shallowRef(false);

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

  <DialogDeleteAsset
    v-model:visible="showDeleteAssetDialog"
    :list="dataSelected"
    list-label="name"
  />

  <DialogRegisterAsset
    v-model:visible="showRegisterAssetDialog"
    list-label="name"
  />
</template>
