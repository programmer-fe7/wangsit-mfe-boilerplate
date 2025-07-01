import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { FilterField } from '@fewangsit/wangsvue/components/filtercontainer/FilterContainer.vue.d';

export const quickFilterFields: FilterField[] = [
  {
    label: 'Asset',
    field: 'name',
    type: 'multiselect',
    placeholder: 'Select asset name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [
          { label: 'Sound System' },
          { label: 'AC Portable Indoor' },
          { label: 'Microphone' },
        ];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Group',
    field: 'groups',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Room' }, { label: 'Warehouse' }, { label: 'Garage' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Brand',
    field: 'brands',
    type: 'multiselect',
    placeholder: 'Select brand name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Samsung' }, { label: 'Hyundai' }, { label: 'Apple' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Model/Type',
    field: 'models',
    type: 'multiselect',
    placeholder: 'Select model name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [
          { label: 'Macbook Pro', value: 'Macbook Pro' },
          { label: 'Ionic 5', value: 'Ionic 5' },
          { label: 'Ultra 24', value: 'Ultra 24' },
        ];
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
        return [
          { label: 'Sound System' },
          { label: 'AC Portable Indoor' },
          { label: 'Microphone' },
        ];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Group',
    field: 'groups',
    type: 'multiselect',
    placeholder: 'Select group',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Room' }, { label: 'Warehouse' }, { label: 'Garage' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Brand',
    field: 'brands',
    type: 'multiselect',
    placeholder: 'Select brand name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Samsung' }, { label: 'Hyundai' }, { label: 'Apple' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Model/Type',
    field: 'models',
    type: 'multiselect',
    placeholder: 'Select model name',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [
          { label: 'Macbook Pro' },
          { label: 'Ionic 5' },
          { label: 'Ultra 24' },
        ];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
];
