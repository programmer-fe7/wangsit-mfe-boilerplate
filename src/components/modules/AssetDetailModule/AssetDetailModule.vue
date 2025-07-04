<script setup lang="ts">
import { Card, Image } from '@fewangsit/wangsvue';
import { computed, onMounted, shallowRef } from 'vue';

import AssetServices from '@/components/services/asset.service';
import { Asset } from '@/types/asset.type';

const props = defineProps<{
  selectedAssetId: string;
}>();

onMounted(() => {
  getAssetData();
});

const selectedAsset = shallowRef<Asset>();

const contentData = computed<{ key: string; value: string | undefined }[][]>(
  () => [
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
  ],
);

const getAssetData = async (): Promise<void> => {
  try {
    const { data } = await AssetServices.getAsset({
      _id: props.selectedAssetId,
    });

    selectedAsset.value = data.data;
  } catch (error) {
    console.error('Error while fetching detail:', error);
    return Promise.reject(error);
  }
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <div class="text-xl font-semibold">{{ selectedAsset?.name }}</div>
        <div>
          <div class="text-sm text-gray-500">Last Modified:</div>
          <div class="font-normal text-xs">
            {{
              `${selectedAsset?.updatedAt} by ${selectedAsset?.userFirstName}`
            }}
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex justify-start gap-4">
        <div>
          <Image :preview="false" :src="selectedAsset?.assetImage" size="big" />
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
