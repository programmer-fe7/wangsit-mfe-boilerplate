<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card } from '@fewangsit/wangsvue';

const { breadcrumbs } = useBreadcrumbStore();
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <!-- The warning below can be ignored, it's a bug with the component -->
      <router-view />
    </template>
  </Card>
</template>
