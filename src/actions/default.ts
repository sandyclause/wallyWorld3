import {
  IAction,
} from '../Interfaces';
import {
  Record, List,
} from 'immutable';
import { IProduct } from '../interfaces/Product';
import { IReview, IReviewWithProductInfo } from '../interfaces/review/review';

export default {};

export enum DefaultActionTypes {
  GET_PRODUCTS_REQUESTED = 'GET_PRODUCTS_REQUESTED',
  GET_PRODUCTS_SUCCEEDED = 'GET_PRODUCTS_SUCCEEDED',
  GET_TRENDS_REQUESTED = 'GET_TRENDS_REQUESTED',
  GET_TRENDS_SUCCEEDED = 'GET_TRENDS_SUCCEEDED',
  GET_TRENDS_FAILED = 'GET_TRENDS_FAILED',
  GET_SEARCH_PRODUCT_REQUESTED = 'GET_SEARCH_PRODUCT_REQUESTED',
  GET_SEARCH_PRODUCT_SUCCEEDED = 'GET_SEARCH_PRODUCT_SUCCEEDED',
  GET_SEARCH_PRODUCTS_REQUESTED = 'GET_SEARCH_PRODUCTS_REQUESTED',
  SELECT_PRODUCT_IDS = 'SELECT_PRODUCT_IDS',
  SELECT_PRODUCT = 'SELECT_PRODUCT',
  GET_REVIEWS = 'GET_REVIEWS',
  GET_REVIEWS_SUCCEEDED = 'GET_REVIEWS_SUCCEEDED',
}


export class GetReviewsAction implements IAction {
  public readonly type = DefaultActionTypes.GET_REVIEWS;
  constructor(
    public payload: {
      itemId: number
    }
  ) {}
}

export class GetReviewsSucceededAction implements IAction {
  public readonly type = DefaultActionTypes.GET_REVIEWS_SUCCEEDED;
  constructor(
    public payload: Record<IReviewWithProductInfo>
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

export class GetProductsSucceeded implements IAction {
  public readonly type = DefaultActionTypes.GET_PRODUCTS_SUCCEEDED;
  constructor(
    public payload: List<Record<IProduct>>
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
    public payload: List<Record<IProduct>>
  ) {}
}

export class GetSearchProducts implements IAction {
  public readonly type = DefaultActionTypes.GET_SEARCH_PRODUCTS_REQUESTED;
  constructor(
    public payload: {
      query: string
    }
  ) {}
}

export class MakeSelectProductIdsAction implements IAction {
  public readonly type = DefaultActionTypes.SELECT_PRODUCT_IDS;
  constructor(
    public payload: List<Record<IProduct>>
  ) {}
}

export class GetSearchProduct implements IAction {
  public readonly type = DefaultActionTypes.GET_SEARCH_PRODUCT_REQUESTED;
  constructor(
    public payload: {
      productId: number
    }
  ) {}
}

// export class GetSearchProductSucceeded implements IAction {
//   public readonly type = DefaultActionTypes.GET_SEARCH_PRODUCT_SUCCEEDED;
//   constructor(
//     public payload: List<Record<IProduct>>
//   ) {}
// }

export class SelectProductAction implements IAction {
  public readonly type = DefaultActionTypes.SELECT_PRODUCT;
  constructor(
    public payload: {
      productId: number
    }
  ) {}
}