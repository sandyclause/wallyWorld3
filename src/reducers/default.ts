import {
  fromJS,
  Record,
  Map,
  List,
} from 'immutable';
import {
  IAction,
} from '../Interfaces';

import {
  DefaultActionTypes,
  GetTrendsSucceededAction,
  MakeSelectProductIdsAction,
  GetProductsSucceeded,
  SelectProductAction,
  GetReviewsSucceededAction,
} from '../actions/default';
import { IProduct } from '../interfaces/Product';
import { IReview, IReviewWithProductInfo } from '../interfaces/review/review';

export interface IReducerState {
  trendProducts: List<Record<IProduct>>;
  searchProducts: List<number>;
  products: Map<number, Record<IProduct>>;
  selectedProductId: number;
  reviews: Map<number, Record<IReviewWithProductInfo>>;
}

const INITIAL_STATE = fromJS({
  trendProducts: {},
  searchProducts: [],
  products: {},
  selectedProductId: -1,
  reviews: {},
});

export const reducer = (state: Record<IReducerState> = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case DefaultActionTypes.GET_REVIEWS_SUCCEEDED: {
      const { 
        payload: reviewData
      } = action as GetReviewsSucceededAction;
      
      return state.setIn(['reviews', reviewData.get('itemId')], reviewData)
    }
    case DefaultActionTypes.GET_TRENDS_SUCCEEDED: {
      const { payload } = action as GetTrendsSucceededAction;

      return state.setIn(['trendProducts'], payload)
    }
    case DefaultActionTypes.SELECT_PRODUCT_IDS: {
      const {
        payload: productsResponse
      } = action as MakeSelectProductIdsAction;

      const productIds = productsResponse.reduce((acc: List<number>, product: Record<IProduct>) => {
        return acc.push(product.get('itemId'));
      }, List());

      return state.setIn(['searchProducts'], productIds)
    }
    case DefaultActionTypes.GET_PRODUCTS_SUCCEEDED: {
      const {
        payload: productsResponse
      } = action as GetProductsSucceeded;
      
      return state.update(
        'products',
        (stateProducts: Map<number, Record<IProduct>>) => {
          return productsResponse.reduce(
            (acc: Map<number, Record<IProduct>>, product: Record<IProduct>) => {
              return acc.set(product.get('itemId'), product)
            },
            stateProducts
          );
        }
      )

    }
    case DefaultActionTypes.SELECT_PRODUCT: {
      const { payload } = action as SelectProductAction;
      const {
        productId
      } = payload;

      return state.set('selectedProductId', productId);
    }
    default:
      return state;
  }
};

export default reducer;
