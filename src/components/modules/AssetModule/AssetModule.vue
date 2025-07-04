<script setup lang="ts">
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from '@fewangsit/wangsvue/components/datatable/DataTable.vue.d';

import { computed, shallowRef } from 'vue';
import { Badge, DataTable } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';
import { Asset } from '@/types/asset.type';

import router from '@/router';
import DialogEditRegisterAsset from './DialogEditRegisterAsset/DialogEditRegisterAsset.vue';
import AssetModuleTableFilter from './AssetModuleTableFilter.vue';
import AssetModuleHeader from './AssetModuleHeader.vue';
import AssetServices from '@/components/services/asset.service';

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
      canShowEditAssetDialog.value = true;
    },
  },
];

const selectedAsset = shallowRef<Asset>();
const canShowEditAssetDialog = shallowRef<boolean>(false);

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
            severity: 'dark',
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
            severity: 'dark',
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

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse<Asset>> => {
  const { data } = await AssetServices.getAssetList(params);
  return data;
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
    :rows="10"
    @toggle-option="selectedAsset = $event"
    data-key="_id"
    lazy
    scroll-height="400px"
    table-name="asset-list"
    use-option
    use-paginator
  />

  <DialogEditRegisterAsset
    v-model:visible="canShowEditAssetDialog"
    :list="selectedAsset ? [selectedAsset] : []"
    :selected-asset="selectedAsset"
    list-label="name"
  />
</template>
