import {
  CHANGE_MODAL_STATE,
  CHANGE_VISITED_STATE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_ACTION,
} from '../types/user';

const initialState = {
  visitedPage: null,
  showModal: false,
  requestingSignUp: false,
  signUpResponse: null,
  requestingLogin: false,
  loginResponse: null,
  loginFailureResponse: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CHANGE_VISITED_STATE:
      return {
        ...prevState,
        visitedPage: action.payload,
      };
    case CHANGE_MODAL_STATE:
      return {
        ...prevState,
        showModal: action.payload,
      };
    case SIGN_UP_REQUEST:
      return {
        ...prevState,
        requestingSignUp: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...prevState,
        requestingSignUp: false,
        signUpResponse: action.payload,
      };
    case SIGN_UP_FAILURE:
      return {
        ...prevState,
        requestingSignUp: false,
        signUpResponse: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...prevState,
        requestingLogin: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        requestingLogin: false,
        loginResponse: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        requestingLogin: false,
        loginFailureResponse: action.payload,
      };
    case LOGOUT_ACTION:
      return {
        ...prevState,
        loginResponse: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;
