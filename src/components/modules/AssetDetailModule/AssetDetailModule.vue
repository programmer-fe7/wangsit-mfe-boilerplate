<script setup lang="ts">
import { Card, Image } from '@fewangsit/wangsvue';
import { OptionValue } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { onMounted, shallowRef } from 'vue';
import response from '../AssetModule/assetResponse.json';
import { Asset } from '@/types/asset.type';

const props = defineProps<{
  selectedAssetId: string | number;
}>();

onMounted(() => {
  const asset = getAssetData();

  if (asset) {
    nameAsset.value = asset.name;
    brandAsset.value = asset.brand;
    categoryAsset.value = asset.category;
    modelAsset.value = asset.model;
    groupAsset.value = asset.group;
  }
});

const nameAsset = shallowRef<OptionValue>();
const imageAssetUrl = shallowRef<string>(
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
);
const brandAsset = shallowRef<OptionValue>();
const categoryAsset = shallowRef<OptionValue>();
const modelAsset = shallowRef<OptionValue>();
const groupAsset = shallowRef<OptionValue>();

const getAssetData = (): Asset | undefined => {
  const currentAsset = response.data.data.find(
    (asset) => asset._id === props.selectedAssetId,
  );

  return currentAsset;
};
</script>

<template>
  <div>Asset Detail</div>

  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <div class="text-xl font-semibold">{{ nameAsset }}</div>
        <div class="text-sm text-gray-500">
          Last Modified: 22/10/23 09:20:05 by Rachel
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex justify-start gap-4">
        <div>
          <Image :preview="false" :src="imageAssetUrl" size="big" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 font-bold text-base">General Information</div>
          <div class="grid grid-rows-2 gap-2 content-start">
            <div>
              <div class="text-xs text-gray-500">Brand</div>
              <div class="font-semibold">{{ brandAsset }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Category</div>
              <div class="font-semibold">{{ categoryAsset }}</div>
            </div>
          </div>
          <div class="grid grid-rows-2 gap-2 content-start">
            <div>
              <div class="text-xs text-gray-500">Model/Type</div>
              <div class="font-semibold">{{ modelAsset }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Group</div>
              <div class="font-semibold">{{ groupAsset }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
