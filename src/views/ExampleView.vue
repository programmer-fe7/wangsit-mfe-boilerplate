<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from '@fewangsit/wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import ExampleModule from '@/components/modules/ExampleModule/ExampleModule.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Home',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>

<template>
  <ExampleModule />
</template>
