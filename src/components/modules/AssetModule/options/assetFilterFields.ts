import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { FilterField } from '@fewangsit/wangsvue/components/filtercontainer/FilterContainer.vue.d';

import AssetServices from '@/components/services/asset.service';

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

        return data.data.nameOptions;
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

        return data.data.groupOptions;
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

        return data.data.brandOptions;
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

        return data.data.modelOptions;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
];
