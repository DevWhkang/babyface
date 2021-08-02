import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  GET_ORDER_DETAIL_REQUEST,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAILURE,
} from '../types/order';

const initialState = {
  requestingGetOrderList: false,
  getOrderListResponse: {
    content: [],
    currentPage: null,
    totalPages: null,
  },
  getOrderListFailure: null,
  requestingGetOrderDetail: false,
  getOrderDetailResponse: {
    content: [],
    currentPage: null,
    totalPages: null,
  },
  getOrderDetailFailure: null,
};

const orderReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_LIST_REQUEST:
      return {
        ...prevState,
        requestingGetOrderList: true,
      };
    case GET_ORDER_LIST_SUCCESS:
      return {
        ...prevState, // more state?
        requestingGetOrderList: false,
        getOrderListResponse: action.payload,
      };
    case GET_ORDER_LIST_FAILURE:
      return {
        ...prevState,
        requestingGetOrderList: false,
        getOrderListFailure: action.payload,
      };
    case GET_ORDER_DETAIL_REQUEST:
      return {
        ...prevState,
        requestingGetOrderDetail: true,
      };
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...prevState,
        requestingGetOrderDetail: false,
        getOrderDetailResponse: action.payload,
      };
    case GET_ORDER_DETAIL_FAILURE:
      return {
        ...prevState,
        requestingGetOrderDetail: false,
        getOrderDetailFailure: action.payload,
      };
    default:
      return prevState;
  }
};

export default orderReducer;
