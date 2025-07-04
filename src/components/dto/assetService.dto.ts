import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export interface GetAssetListParams extends QueryParams {
  search?: string;
  brand?: string[];
  group?: string[];
  name?: string[];
  model?: string[];
  page?: number;
  limit?: number;
  sortOrder?: number | 1 | -1;
  sortBy?: string;
  _id?: string;
}

export interface GetAssetOptionsParams {
  brandOptions?: boolean;
  nameOptions?: boolean;
  categoryOptions?: boolean;
  modelOptions?: boolean;
  groupOptions?: boolean;
}

export interface UpdateAssetParams {
  _id: string;
}

export interface GetAssetDetailParams {
  _id?: string;
}

export interface RegEditAssetBody {
  category: string;
  brand: string;
  model: string;
  group: string;
  aliasName: string;
  name: string;
  assetImage: File;
}

export interface DeleteAssetBody {
  _id: string;
}
