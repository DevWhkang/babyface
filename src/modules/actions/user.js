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
import axios from 'axios';

const url = 'http://106.10.53.116:8099';

export const changeModalState = (payload) => {
  return {
    type: CHANGE_MODAL_STATE,
    payload,
  };
};

export const changeVisitedState = (payload) => {
  return {
    type: CHANGE_VISITED_STATE,
    payload,
  };
};

// sign-up
export const signUpAction = (payload) => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const body = {
        email: payload.email,
        mobile: payload.mobile.replace(/-/g, ''),
        password: payload.password,
      };
      console.log(body);
      const reault = await axios.post(`${url}/sign-up`, body);
      dispatch(signUpSuccess(reault.data));
    } catch (err) {
      dispatch(signUpFailure(err));
    }
  };
};

const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (payload) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload,
  };
};

const signUpFailure = () => {
  return {
    type: SIGN_UP_FAILURE,
  };
};

// login
export const loginAction = (payload) => {
  return async (dispatch, getState) => {
    dispatch(loginRequest());
    try {
      const body = {
        email: payload.email,
        password: payload.password,
      };
      const reault = await axios.post(`${url}/login`, body);
      dispatch(loginSuccess(reault.data));
    } catch (err) {
      dispatch(loginFailure(err));
    }
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

// logout
export const logoutAction = () => {
  return {
    type: LOGOUT_ACTION,
  };
};
