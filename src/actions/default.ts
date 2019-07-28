import {
  IAction,
} from '../Interfaces';
import {
  Record,
} from 'immutable';

export default {};

export enum DefaultActionTypes {
  ADD_USER = 'ADD_USER',
  ADD_TODO = 'ADD_TODO',
  ADD_CAT_FACT = 'ADD_CAT_FACT',
  GET_PRODUCTS_REQUESTED = 'GET_PRODUCTS_REQUESTED',
  GET_TRENDS_REQUESTED = 'GET_TRENDS_REQUESTED',
  GET_TRENDS_SUCCEEDED = 'GET_TRENDS_SUCCEEDED',
  GET_TRENDS_FAILED = 'GET_TRENDS_FAILED',
}

export interface IUser {
  id: number;
  name: string;
}

export interface IImageEntity {
  entityType: string;
  largeImage: string;
  mediumImage: string;
  thumbnailImage: string;
}

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
  imageEntities: Record<IImageEntity>;
  itemId: number;
  largeImage: string;
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

export const UserFactory = Record<IUser>({
  id: -1,
  name: '',
});

export interface ITodo {
  id:  number;
  userId: number;
  title: string;
}

export const TodoFactory = Record<ITodo>({
  id: -1,
  userId: -1,
  title: 'untitled',
});

export class AddUserAction implements IAction {
  public readonly type = DefaultActionTypes.ADD_USER;
  constructor(
    public payload: {
      user: Record<IUser>,
    }
  ) {}
}

export class AddTodoAction implements IAction {
  public readonly type = DefaultActionTypes.ADD_TODO;
  constructor(
    public payload: {
      userId: number,
      todo: Record<ITodo>,
    }
  ) {}
}

export class AddCatFactAction implements IAction {
  public readonly type = DefaultActionTypes.ADD_CAT_FACT;
  constructor(
    public payload: {
      userId: number,
      todo: Record<ITodo>,
    }
  ) {}
}

export class GetProductsAction implements IAction {
  public readonly type = DefaultActionTypes.GET_PRODUCTS_REQUESTED;
  constructor(
    public payload: {
      itemId: number
    }
  ) {}
}

export class GetTrendsAction implements IAction {
  public readonly type = DefaultActionTypes.GET_TRENDS_REQUESTED;
  constructor(
  ) {}
}

export class GetTrendsSucceededAction implements IAction {
  public readonly type = DefaultActionTypes.GET_TRENDS_SUCCEEDED;
  constructor(
    public payload: Array<Record<IProduct>>
  ) {}
}