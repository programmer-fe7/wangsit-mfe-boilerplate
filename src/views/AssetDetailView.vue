<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import AssetDetailModule from '@/components/modules/AssetDetailModule/AssetDetailModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Asset Detail',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <AssetDetailModule />
</template>
