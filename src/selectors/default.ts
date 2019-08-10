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
import {
  ITodo,
  IUser,
} from '../actions/default';
import { IProduct } from '../interfaces/Product';
import { number } from 'prop-types';

export const selectReducerState = () => (state: any) => {
  const reducerState = state.get('default');
  if (reducerState != null) {
    return reducerState;
  }
  return Map();
};

export const makeSelectUsers = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('users') || Map<number, Record<IUser>>(),
);

export const makeSelectUser = (userId: number) => createSelector(
  makeSelectUsers(),
  (users) => users.get(userId),
);

export const makeSelectTodos = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('todos') || Map<number, Record<ITodo>>(),
);

export const makeSelectTodosForUser = (userId: number) => createSelector(
  makeSelectTodos(),
  (todos) => todos.filter(todo => todo.get('userId') === userId).toList() || List<Record<ITodo>>(),
);

export const makeSelectTrendProducts = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('trendProducts') || List<Record<IProduct>>(),
);

export const makeSelectSelectedSearchProductsIds = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('searchProducts') || List<number>(),
);

export const makeSelectProducts = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('products') || Map<number, Record<IProduct>>(),
);

export const makeSelectSearchResults = () => createSelector(
  makeSelectProducts(),
  makeSelectSelectedSearchProductsIds(),
  (products: Map<number, Record<IProduct>>, productIds: List<number>) => {

    const productsMap = productIds.map((productId: number) => {
      return products.get(productId) ? products.get(productId) : null
    })

    return productsMap;
  }
);

export default {
  selectReducerState,
};
