import { Record, List } from "immutable";

import { IImageEntity } from "../ImageEntity";

export interface IProduct {
  addToCartUrl: string;
  affiliateAddToCartUrl: string;
  attributes: object;
  availableOnline: boolean;
  brandName: string;
  bundle: boolean;
  categoryNode: string;
  categoryPath: string;
  clearance: boolean;
  color: string;
  customerRating: string;
  customerRatingImage: string;
  freeShipToStore: boolean;
  freeShippingOver35Dollars: boolean;
  giftOptions: object;
  imageEntities: List<Record<IImageEntity>>;
  itemId: number;
  largeImage: string;
  longDescription: string;
  marketplace: boolean;
  mediumImage: string;
  modelNumber: string;
  msrp: number;
  name: string;
  ninetySevenCentShpping: boolean;
  numReviews: number;
  offerType: string;
  parentItemId: number;
  preOrder: boolean;
  productTrackingUrl: string;
  productUrl: string;
  rhid: string;
  sellerInfo: string;
  salePrice: number;
  shipToStore: boolean;
  shortDescription: string;
  size: string;
  standardShipRate: number;
  stock: string;
  thumbnailImage: string;
  upc: string;
  variants: number[];
}