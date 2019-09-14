import {
  createSelector,
} from 'reselect';
import {
  Map,
  List,
  Record,
} from 'immutable';
import {
  IReducerState,
} from '../reducers/default';
import { IProduct } from '../interfaces/Product';
import { IReviewWithProductInfo } from '../interfaces/review/review';

export const selectReducerState = () => (state: any) => {
  const reducerState = state.get('default');
  if (reducerState != null) {
    return reducerState;
  }
  return Map();
};

export const makeSelectSelectedProductIds = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('searchProducts') || List<number>(),
);

export const makeSelectProducts = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('products') || Map<number, Record<IProduct>>(),
);

export const makeSelectSearchResults = () => createSelector(
  makeSelectProducts(),
  makeSelectSelectedProductIds(),
  (products: Map<number, Record<IProduct>>, productIds: List<number>) => {

    const productsMap = productIds.map((productId: number) => {
      return products.get(productId) ? products.get(productId) : null
    })

    return productsMap;
  }
);

export const makeSelectReviews = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('reviews') || Map<number, Record<IProduct>>(),
);

export const makeSelectSelectedProductReview = () => createSelector(
  makeSelectReviews(),
  makeSelectSelectedProductId(),
  (reviews: Map<number, Record<IReviewWithProductInfo>>, productId: number) => {
    return reviews.get(productId) || Map();
  }
);

export const makeSelectSelectedProductId = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('selectedProductId'),
);

export const makeSelectProduct = () => createSelector(
  makeSelectProducts(),
  makeSelectSelectedProductId(),
  (products: Map<number, Record<IProduct>>, productId: number) => {
    return products.get(productId) || Map();
  }
);

export default {
  selectReducerState,
};
