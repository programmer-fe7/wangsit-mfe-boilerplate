<script setup lang="ts">
import { ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card, TabMenu } from '@fewangsit/wangsvue';
import { MenuItem } from '@fewangsit/wangsvue/components/menuitem';

const { breadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another-page',
  },
]);
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <!-- The warning below can be ignored, it's a bug with the component -->
      <TabMenu :menu="tabMenus" />
      <router-view />
    </template>
  </Card>
</template>
