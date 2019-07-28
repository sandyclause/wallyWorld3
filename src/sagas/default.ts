import {
  delay,
  takeEvery,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  DefaultActionTypes,
  AddTodoAction,
  TodoFactory,
  GetProductsAction,
  GetTrendsAction,
} from '../actions/default';
import request from '../utils';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Qs from "qs";
import { apiKey } from '../keys/keys';
// import {
//   fromJS,
// } from 'immutable';

export default function* defaultSaga() {
  // takeLatest(DefaultActionTypes.GET_PRODUCTS_REQUESTED, getProducts),
  yield takeLatest(DefaultActionTypes.GET_TRENDS_REQUESTED, fetchTrends);
  yield takeEvery(DefaultActionTypes.ADD_TODO, addTodo);
  while (true) {
    console.debug('saga running');
    yield delay(10000);
  }
}

// function* getProducts(
//   action: GetProductAction
// ) {
//   try {
//     const data = yield call(fetchProduct, action.payload);
//     const variants = data.get('variants');
//     yield put(getProductSuccess(data));
//     if (variants !== undefined) {
//       yield put(getVariant(variants));
//     } else {
//       yield put(getVariantClear());
//     }
    
//     // call reviews
//     yield put(getReviews(action.payload));
//   } catch(e) {
//     yield put(getProductFailure(e));
//   }
  
// }

// const fetchTrends = () => {
//   return axios.request<AxiosRequestConfig>({
//     url: "https://proxy.hackeryou.com",
//     method: "GET",
//     // dataResponse: "json",
//     paramsSerializer: function (params) {
//       return Qs.stringify(params, { arrayFormat: "brackets" });
//     },
//     params: {
//       reqUrl:
//         "http://api.walmartlabs.com/v1/trends",
//       params: {
//         apiKey: apiKey
//       },
//       proxyHeaders: {
//         headers_params: "value"
//       },
//       xmlToJSON: false
//     }
//   }).then(res => {
//     return fromJS(res.data);
//   });
// }

function* apiCallWaitingAction({...params}) {
  try {
    return axios.request<AxiosRequestConfig>({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      ...params
    })
  }
  catch (e) {
    console.log(e)
  }
}

function* fetchTrends(
  action: GetTrendsAction,
) {

  console.log('fetchTrends saga')
  const promise = yield call(apiCallWaitingAction, {
    params: {
      reqUrl:
        "http://api.walmartlabs.com/v1/trends",
      params: {
        apiKey: apiKey
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  });

  promise.then((result: AxiosResponse) => {
    const data = result.data.items;


    console.log(result.data.items)
    return result.data;
  })

}



function* addTodo(
  action: AddTodoAction,
) {
  const {
    payload,
  } = action;
  const {
    userId,
    todo,
  } = payload;

  if (todo.get('title') !== '') {
    console.debug('add todo normally');
    return;
  }
  const response: {
    quote: string;
  } = yield call(request,
    'https://api.kanye.rest',
    {
      // mode: 'no-cors',
    }
  );
  if (response != null) {
    const {
      quote,
    } = response;

    yield put(new AddTodoAction({
      userId,
      todo: TodoFactory({
        title: quote,
      })
    }))
  }
}