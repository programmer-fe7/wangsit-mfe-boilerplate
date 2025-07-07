<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import AssetModule from '@/components/modules/AssetModule/AssetModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Asset',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <AssetModule />
</template>
