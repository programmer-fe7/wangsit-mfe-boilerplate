<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import AssetModule from '@/components/modules/ExampleModule/AssetModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Another Page',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <AssetModule />
</template>
