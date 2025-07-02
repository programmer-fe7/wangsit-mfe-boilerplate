<script setup lang="ts">
import { Card, Image } from '@fewangsit/wangsvue';
import { computed, onMounted, shallowRef } from 'vue';
import response from '../AssetModule/assetResponse.json';
import { Asset } from '@/types/asset.type';

const props = defineProps<{
  selectedAssetId: string | number;
}>();

onMounted(() => {
  getAssetData();
});

const selectedAsset = shallowRef<Asset>();

/*
 * FIXME: All computed values should have types
 * Reference: Coding style guide chapter 6.3.4
 */
const contentData = computed(() => [
  [
    {
      key: 'Brand',
      value: selectedAsset.value?.brand,
    },
    {
      key: 'Category',
      value: selectedAsset.value?.category,
    },
  ],
  [
    {
      key: 'Model',
      value: selectedAsset.value?.model,
    },
    {
      key: 'Group',
      value: selectedAsset.value?.group,
    },
  ],
]);

const getAssetData = (): void => {
  const currentAsset = response.data.data.find(
    (asset) => asset._id === props.selectedAssetId,
  );

  selectedAsset.value = currentAsset;
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <div class="text-xl font-semibold">{{ selectedAsset?.name }}</div>
        <div class="text-sm text-gray-500">
          Last Modified: 22/10/23 09:20:05 by Rachel
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex justify-start gap-4">
        <div>
          <Image
            :preview="false"
            :src="selectedAsset?.profilePictureBig"
            size="big"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 font-bold text-base">General Information</div>
          <div
            :key="columnIndex"
            v-for="(column, columnIndex) in contentData"
            class="grid grid-rows-2 gap-2 content-start"
          >
            <div :key="rowIndex" v-for="(row, rowIndex) in column">
              <div class="text-xs text-gray-500">{{ row.key }}</div>
              <div class="font-semibold">{{ row.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
