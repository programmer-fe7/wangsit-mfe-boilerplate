<script setup lang="ts">
import { FilterContainer } from '@fewangsit/wangsvue';
import { filterFields } from './options/assetFilterFields';
</script>

<template>
  <FilterContainer :fields="filterFields" table-name="asset-list" />
</template>
