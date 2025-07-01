export interface Asset {
  _id: string;
  key: number;
  profilePictureBig?: string;
  profilePictureMedium?: string;
  profilePictureSmall?: string;
  name: string;
  group: string;
  category: string;
  brand: string;
  model: string;
  aliasName: string;
}
