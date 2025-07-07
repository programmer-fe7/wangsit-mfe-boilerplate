<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card } from '@fewangsit/wangsvue';

import router from '@/router';

const { breadcrumbs } = useBreadcrumbStore();

const currentRoute = computed<string>(() => {
  switch (router.currentRoute.value.name) {
    case 'AssetDetailView':
      return 'Asset Detail';
    default:
      return 'Asset List';
  }
});
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <!-- FIXME: Delete currentRoute, it's not in the Figma design -->
  <div>{{ currentRoute }}</div>
  <Card>
    <template #content>
      <!-- The warning below can be ignored, it's a bug with the component -->
      <router-view />
    </template>
  </Card>
</template>
