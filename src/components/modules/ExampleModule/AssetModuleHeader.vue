<script setup lang="ts">
import { shallowRef } from 'vue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import {
  ButtonBulkAction,
  ButtonDownload,
  ButtonFilter,
  ButtonSearch,
} from '@fewangsit/wangsvue';
import DialogDeleteUser from './DialogDeleteUser/DialogDeleteUser.vue';
import { Asset } from '@/types/asset.type';

const dataSelected = shallowRef<Asset[]>([]);
const showDeleteUserDialog = shallowRef(false);

const bulkAction: MenuItem[] = [
  {
    label: 'Delete User',
    icon: 'checkbox-blank-circle',
    danger: true,
    command: (): void => {
      showDeleteUserDialog.value = true;
    },
  },
];
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
  </div>

  <DialogDeleteUser
    v-model:visible="showDeleteUserDialog"
    :list="dataSelected"
    list-label="name"
  />
</template>
