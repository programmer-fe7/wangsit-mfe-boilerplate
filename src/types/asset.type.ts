export interface Asset {
  _id: string;
  key: number;
  profilePictureBig?: string;
  profilePictureMedium?: string;
  profilePictureSmall?: string;
  name: string;
  groups: string[];
  categories: string[];
  brands: string[];
  models: string[];
  aliasName: string;
}
