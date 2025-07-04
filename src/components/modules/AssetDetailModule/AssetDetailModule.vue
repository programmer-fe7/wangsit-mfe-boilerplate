<script setup lang="ts">
import { Card, Image } from '@fewangsit/wangsvue';
import { computed, onMounted, shallowRef } from 'vue';
import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import { GetAssetDetailResponseBody } from '@/types/assetService.type';

import AssetServices from '@/components/services/asset.service';

const props = defineProps<{
  selectedAssetId: string;
}>();

onMounted(() => {
  getAssetData({ _id: props.selectedAssetId });
});

/*
 * FIXME: Don't use null, use undefined instead, so it'll look like this:
 * const selectedAsset = shallowRef<GetAssetDetailResponseBody['data']>();
 *
 * Read this:
 * https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript
 * selectedAsset doesn't have a value yet, it shouldn't have the value of 'null'
 *
 * Also, this:
 * GetAssetDetailResponseBody['data']
 * Isn't this just the same as the `Asset` type? Use that instead
 */
const selectedAsset = shallowRef<GetAssetDetailResponseBody['data'] | null>(
  null,
);

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

/*
 * FIXME: This function doesn't need an argument, just put the id
 * inside the AssetServices.getAsset function call
 */
const getAssetData = async (params: QueryParams): Promise<void> => {
  try {
    const { data } = await AssetServices.getAsset(params);

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
