import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { FilterField } from '@fewangsit/wangsvue/components/filtercontainer/FilterContainer.vue.d';

export const quickFilterFields: FilterField[] = [
  {
    label: 'Country',
    field: 'country',
    type: 'multiselect',
    placeholder: 'Select country',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Indonesia' }, { label: 'Malaysia' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Age',
    fields: ['minAge', 'maxAge'],
    type: 'rangenumber',
    placeholder: '0',
  },
];

export const filterFields: FilterField[] = [
  {
    label: 'Country',
    field: 'country',
    type: 'multiselect',
    placeholder: 'Select country',
    fetchOptionFn: async (): Promise<Option[]> => {
      try {
        return [{ label: 'Indonesia' }, { label: 'Malaysia' }];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
  {
    label: 'Age',
    fields: ['minAge', 'maxAge'],
    type: 'rangenumber',
    placeholder: '0',
  },
];
