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
  ITodo,
  AddTodoAction,
  IUser,
  AddUserAction,
  UserFactory,
  TodoFactory,
  GetTrendsSucceededAction,
  GetSearchProductSucceeded,
  GetProductsSucceeded,
} from '../actions/default';
import { IProduct } from '../interfaces/Product';

// import {
//   Settings,
// } from '../../models';

export interface IReducerState {
  lastUserId: number;
  lastTodoId: number;
  users: Map<number, Record<IUser>>;
  todos: Map<number, Record<ITodo>>;
  trendProducts: List<Record<IProduct>>;
  searchProducts: List<number>;
  products: Map<number, Record<IProduct>>;
}

const initialUsers = [
  UserFactory({
    id: 1,
    name: 'Ryan',
  }),
  UserFactory({
    id: 2,
    name: 'Sandy',
  }),
  UserFactory({
    id: 3,
    name: 'Sean',
  }),
  UserFactory({
    id: 4,
    name: 'Peter',
  }),
]

const initialTodos = [
  TodoFactory({
    id: 1,
    userId: 1,
    title: 'Drink Water',
  })
]
const INITIAL_STATE = fromJS({
  lastUserId: initialUsers.length,
  lastTodoId: initialTodos.length,
  users: Map<number, Record<IUser>>().withMutations((mutableMap) => {
    initialUsers.forEach((user) => {
      mutableMap.set(user.get('id'), user);
    })
  }),
  todos: Map<number, Record<ITodo>>().withMutations((mutableMap) => {
    initialTodos.forEach((todo) => {
      mutableMap.set(todo.get('id'), todo);
    })
  }),
  trendProducts: {},
  searchProducts: [],
  products: {},
});

export const reducer = (state: Record<IReducerState> = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case DefaultActionTypes.ADD_USER: {
      const lastUserId = state.get('lastUserId');
      const {
        payload,
      } = action as AddUserAction;
      const {
        user,
      } = payload;

      if (user.get('name') === '') {
        console.debug('no name!')
        return state;
      }

      const userId = lastUserId + 1;
      return state.withMutations((mutableState) => {
        mutableState.set('lastUserId', userId);
        mutableState.setIn(
          ['users', userId],
          user.set('id', userId),
        );
      })
    }
    case DefaultActionTypes.ADD_TODO: {
      const lastTodoId = state.get('lastTodoId');
      const {
        payload,
      } = action as AddTodoAction;
      const {
        userId,
        todo,
      } = payload;

      if (todo.get('title') === '') {
        console.debug('no title!')
        return state;
      }

      const todoId = lastTodoId + 1;
      return state.withMutations((mutableState) => {
        mutableState.set('lastTodoId', todoId);
        mutableState.setIn(
          ['todos', todoId],
          todo.withMutations((mutableTodo) => {
            mutableTodo.set('id', todoId)
            mutableTodo.set('userId', userId)
          }),
        );
      });
    }
    case DefaultActionTypes.GET_TRENDS_SUCCEEDED: {
      const { payload } = action as GetTrendsSucceededAction;

      return state.setIn(['trendProducts'], payload)
    }
    case DefaultActionTypes.GET_SEARCH_PRODUCT_SUCCEEDED: {
      const {
        payload: productsResponse
      } = action as GetSearchProductSucceeded;

      const productIds = productsResponse.reduce((acc: List<number>, product: Record<IProduct>) => {
        return acc.push(product.get('itemId'));
      }, List());

      return state.setIn(['searchProducts'], productIds)
    }
    case DefaultActionTypes.GET_PRODUCTS_SUCCEEDED: {
      const {
        payload: productsResponse
      } = action as GetProductsSucceeded;

      console.log(productsResponse)
      
      return state.update(
        'products',
        (stateProducts: Map<number, Record<IProduct>>) => {
          console.log(stateProducts)
          return productsResponse.reduce(
            (acc: Map<number, Record<IProduct>>, product: Record<IProduct>) => {
              return acc.set(product.get('itemId'), product)
            },
            stateProducts
          );
        }
      )

    }
    default:
      return state;
  }
};

export default reducer;
