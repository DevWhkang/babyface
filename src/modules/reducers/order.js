import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
} from '../types/order';

const initialState = {
  requestingGetOrderList: false,
  getOrderListResponse: {
    content: [],
    currentPage: null,
    totalPages: null,
  },
  getOrderListFailure: null,
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
    default:
      return prevState;
  }
};

export default orderReducer;
