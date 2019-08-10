import {
  delay,
  takeEvery,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  DefaultActionTypes,
  GetTrendsAction,
  GetTrendsSucceededAction,
  GetSearchProducts,
  GetSearchProductsSucceeded,
  GetProductsSucceeded,
  GetSearchProduct,
} from '../actions/default';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Qs from "qs";
import { apiKey } from '../keys/keys';
import { fromJS } from 'immutable';

export default function* defaultSaga() {
  yield takeLatest(DefaultActionTypes.GET_TRENDS_REQUESTED, searchTrends);
  yield takeLatest(DefaultActionTypes.GET_SEARCH_PRODUCTS_REQUESTED, searchProducts);
  yield takeLatest(DefaultActionTypes.GET_SEARCH_PRODUCT_REQUESTED, searchProduct);
  while (true) {
    console.debug('saga running');
    yield delay(10000);
  }
}

function* apiCallWaitingAction({...params}) {
  return yield call(apiCall, {...params})
}

function* apiCall(params: any) {
  const apiResp: {
    data?: any;
    error?: Error,
  } = {};
  try {
  const resp: AxiosResponse = yield axios.request<AxiosRequestConfig>({
      url: "https://proxy.hackeryou.com",
      method: "GET",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      ...params
    })

    apiResp.data = resp;
  }
  catch (e) {
    apiResp.error = e;
  }

  return apiResp;
}

function* searchProduct(
  action: GetSearchProduct,
) {

  const {
    payload
  } = action;
  const {
    productId
  } = payload;

  const {
    data,
    error,
  }: {
    data: any,
    error: Error,
  } = yield call(apiCallWaitingAction, {
    params: {
      reqUrl:
      `http://api.walmartlabs.com/v1/items/${productId}`,
      params: {
        apiKey: apiKey,
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  });

  if (data) {
    console.log(data)
    const immutableData = fromJS(data.data);
    if (immutableData == null) {
      console.error('invalid response', data)
    }
    // yield put(new GetProductsSucceeded(product));
    // yield put(new GetSearchProductsSucceeded(product))
  } else {
    console.error('get products error', error)
  }
}

function* searchProducts(
  action: GetSearchProducts,
) {

  const {
    payload
  } = action;
  const {
    query
  } = payload;

  const {
    data,
    error,
  }: {
    data: any,
    error: Error,
  } = yield call(apiCallWaitingAction, {
    params: {
      reqUrl:
        "http://api.walmartlabs.com/v1/search",
      params: {
        apiKey: apiKey,
        query: query,
      },
      proxyHeaders: {
        headers_params: "value"
      },
      xmlToJSON: false
    }
  });

  if (data) {
    console.log('search', data)
    const immutableData = fromJS(data.data);
    const products = immutableData.get('items');
    if (products == null) {
      console.error('invalid response', data)
    }
    yield put(new GetProductsSucceeded(products));
    yield put(new GetSearchProductsSucceeded(products))
  } else {
    console.error('get products error', error)
  }
}

function* searchTrends(
  action: GetTrendsAction,
) {

  const {
    data,
    error,
  }: {
    data: any,
    error: Error,
  } = yield call(apiCallWaitingAction, {
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

  if (data) {
    const immutableData = fromJS(data.data);
    const products = immutableData.get('items');
    if (products == null) {
      console.error('invalid response', data)
    }
    yield put(new GetTrendsSucceededAction(products))
  } else {
    console.error('get trends error', error)
  }
}