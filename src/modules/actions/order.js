import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
} from '../types/order';
import axios from 'axios';

const url = 'http://106.10.53.116:8099';

export const getOrderListAction = (query) => {
  return async (dispatch, getState) => {
    dispatch(getOrderListRequest());
    try {
      const reault = await axios.get(`${url}/order`, {
        params: { page: query },
      });
      dispatch(getOrderListSuccess(reault.data));
    } catch (err) {
      dispatch(getOrderListFailure(err));
    }
  };
};

const getOrderListRequest = () => {
  return {
    type: GET_ORDER_LIST_REQUEST,
  };
};

const getOrderListSuccess = (payload) => {
  return {
    type: GET_ORDER_LIST_SUCCESS,
    payload,
  };
};

const getOrderListFailure = () => {
  return {
    type: GET_ORDER_LIST_FAILURE,
  };
};
