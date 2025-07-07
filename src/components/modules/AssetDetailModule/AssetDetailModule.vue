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
        key: 'Model/Type',
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
  }
};
</script>

<template>
  <Card :pt="{ root: { class: 'p-0' } }">
    <template #title>
      <div class="flex justify-between items-center gap-[100px]">
        <div class="text-base font-bold text-general-800">
          {{ selectedAsset?.name }}
        </div>
        <div class="ml-auto text-right flex flex-col items-end">
          <span class="text-[9px] font-medium text-general-400 leading-normal">
            Last Modified:
          </span>
          <div class="text-xs font-medium text-general-800">
            {{
              `${selectedAsset?.updatedAt} by ${selectedAsset?.userFirstName}`
            }}
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex justify-start gap-[24px]">
        <div>
          <Image :preview="false" :src="selectedAsset?.assetImage" size="big" />
        </div>
        <div class="flex flex-col gap-[4px]">
          <div class="text-xs font-bold text-general-800">
            General Information
          </div>
          <div class="grid grid-cols-2 gap-[32px]">
            <div
              :key="columnIndex"
              v-for="(column, columnIndex) in contentData"
              class="grid grid-rows-2 content-start"
            >
              <div :key="rowIndex" v-for="(row, rowIndex) in column">
                <div class="text-[9px] font-medium text-general-400">
                  {{ row.key }}
                </div>
                <div class="text-xs font-medium text-general-800">
                  {{ row.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
