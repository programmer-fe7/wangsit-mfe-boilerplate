<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { Badge, DataTable } from '@fewangsit/wangsvue';
import {
  FetchResponse,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/components/datatable/DataTable.vue.d';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import { Asset } from '@/types/asset.type';
import router from '@/router';
import DialogEditRegisterAsset from './DialogEditRegisterAsset/DialogEditRegisterAsset.vue';
import AssetModuleTableFilter from './AssetModuleTableFilter.vue';
import response from '../AssetModule/assetResponse.json';
import AssetModuleHeader from './AssetModuleHeader.vue';

const selectedAsset = shallowRef<Asset>();
const showEditAssetDialog = shallowRef<boolean>(false);

const singleAction: MenuItem[] = [
  {
    label: 'Detail',
    icon: 'file-copy',
    command: (): void => {
      router.push({
        name: 'AssetDetailView',
        params: { selectedAssetId: selectedAsset.value?._id },
      });
    },
  },
  {
    label: 'Edit',
    icon: 'edit',
    command: (): void => {
      showEditAssetDialog.value = true;
    },
  },
];

const tableColumns = computed<TableColumn[]>(() => {
  return [
    {
      field: 'name',
      header: 'Asset',
      sortable: true,
      fixed: true,
    },
    {
      field: 'groups',
      header: 'Group',
      sortable: true,
      fixed: true,
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.group,
          },
        };
      },
    },
    {
      field: 'categories',
      header: 'Category',
      sortable: true,
      fixed: true,
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.category,
          },
        };
      },
    },
    {
      field: 'brands',
      header: 'Brand',
      sortable: true,
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.brand,
          },
        };
      },
    },
    {
      field: 'models',
      header: 'Model/Type',
      sortable: true,
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.model,
          },
        };
      },
    },
    {
      field: 'aliasName',
      header: 'Alias Name',
      sortable: true,
      fixed: true,
    },
  ];
});

const getTableData = async (): Promise<FetchResponse<Asset> | undefined> => {
  try {
    const data = response;

    return data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AssetModuleHeader />
  <AssetModuleTableFilter />
  <!-- <ExampleModuleQuickFilter /> -->
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedAsset = $event"
    data-key="_id"
    lazy
    table-name="asset-list"
    use-option
    use-paginator
  />

  <DialogEditRegisterAsset
    v-model:visible="showEditAssetDialog"
    :list="selectedAsset ? [selectedAsset] : []"
    :selected-asset="selectedAsset"
    list-label="name"
  />
</template>
