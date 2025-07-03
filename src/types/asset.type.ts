import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';

export interface Asset {
  _id: string;
  category: string;
  brand: string;
  model: string;
  group: string;
  name: string;
  aliasName: string;
  assetImage?: string;
  assetNumber: number;
  userFirstName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssetOption {
  nameOptions: Option[];
  groupOptions: Option[];
  brandOptions: Option[];
  modelOptions: Option[];
  categoryOptions: Option[];
}
