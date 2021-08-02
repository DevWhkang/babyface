import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  GET_ORDER_DETAIL_REQUEST,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAILURE,
} from '../types/order';
import axios from 'axios';

const url = 'http://106.10.53.116:8099';

// order list
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

// order detail
export const getOrderDetailAction = (param) => {
  return async (dispatch, getState) => {
    dispatch(getOrderDetailRequest());
    try {
      const reault = await axios.get(`${url}/order/${param}`);
      dispatch(getOrderDetailSuccess(reault.data));
    } catch (err) {
      dispatch(getOrderDetailFailure(err));
    }
  };
};

const getOrderDetailRequest = () => {
  return {
    type: GET_ORDER_DETAIL_REQUEST,
  };
};

const getOrderDetailSuccess = (payload) => {
  return {
    type: GET_ORDER_DETAIL_SUCCESS,
    payload,
  };
};

const getOrderDetailFailure = () => {
  return {
    type: GET_ORDER_DETAIL_FAILURE,
  };
};
