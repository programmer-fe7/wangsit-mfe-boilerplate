import { Asset } from './asset.type';

export interface GetAssetListResponseBody {
  totalRecords: number;
  data: Asset[];
}

export interface GetAssetDetailResponseBody {
  data: Asset;
}
