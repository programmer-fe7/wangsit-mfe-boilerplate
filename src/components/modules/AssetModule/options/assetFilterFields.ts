import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { FilterField } from '@fewangsit/wangsvue/components/filtercontainer/FilterContainer.vue.d';

import AssetServices from '@/components/services/asset.service';

export const quickFilterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          nameOptions: true,
        });

        // FIXME: You should just return data.data.nameOptions
        const { nameOptions } = data.data;
        return nameOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Group',
    field: 'group',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          groupOptions: true,
        });

        const { groupOptions } = data.data;
        return groupOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Brand',
    field: 'brand',
    type: 'multiselect',
    placeholder: 'Select brand name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          brandOptions: true,
        });

        const { brandOptions } = data.data;
        return brandOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Model/Type',
    field: 'model',
    type: 'multiselect',
    placeholder: 'Select model name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          modelOptions: true,
        });

        const { modelOptions } = data.data;
        return modelOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
];

export const filterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          nameOptions: true,
        });

        const { nameOptions } = data.data;
        return nameOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Group',
    field: 'group',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          groupOptions: true,
        });

        const { groupOptions } = data.data;
        return groupOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Brand',
    field: 'brand',
    type: 'multiselect',
    placeholder: 'Select brand name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          brandOptions: true,
        });

        const { brandOptions } = data.data;
        return brandOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Model/Type',
    field: 'model',
    type: 'multiselect',
    placeholder: 'Select model name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        const { data } = await AssetServices.getAssetOptions({
          modelOptions: true,
        });

        const { modelOptions } = data.data;
        return modelOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
];
