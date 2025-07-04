import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { Asset, AssetOption } from '@/types/asset.type';
import {
  FetchDetailResponse,
  FetchListResponse,
} from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

import {
  DeleteAssetBody,
  GetAssetDetailParams,
  GetAssetListParams,
  GetAssetOptionsParams,
  RegEditAssetBody,
  UpdateAssetParams,
} from '../dto/assetService.dto';

const createAPIInstance = (headers = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL('APP_WANGS_ASSET_REST_API');

  return axios.create({
    baseURL: `${BASE_URL}/v2/assets`,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
  });
};

const AssetServices = {
  getAssetList: (
    params: GetAssetListParams,
  ): Promise<AxiosResponse<FetchListResponse<Asset>>> => {
    return createAPIInstance().get('', { params });
  },

  getAsset: (
    params: GetAssetDetailParams,
  ): Promise<AxiosResponse<FetchDetailResponse<Asset>>> => {
    return createAPIInstance().get(`/${params._id}`);
  },

  getAssetOptions: (
    params: GetAssetOptionsParams,
  ): Promise<AxiosResponse<FetchDetailResponse<AssetOption>>> => {
    return createAPIInstance().get('/options', { params });
  },

  postRegisterAsset: (body: RegEditAssetBody): Promise<AxiosResponse<void>> => {
    return createAPIInstance({ 'Content-Type': 'multipart/form-data' }).post(
      '/',
      body,
    );
  },

  putEditAsset: (
    params: UpdateAssetParams,
    body: RegEditAssetBody,
  ): Promise<AxiosResponse<void>> => {
    return createAPIInstance({ 'Content-Type': 'multipart/form-data' }).put(
      `/${params._id}`,
      body,
    );
  },

  deleteAsset: (params: DeleteAssetBody): Promise<AxiosResponse<void>> => {
    return createAPIInstance().delete(`/${params._id}`);
  },
};

export default AssetServices;
