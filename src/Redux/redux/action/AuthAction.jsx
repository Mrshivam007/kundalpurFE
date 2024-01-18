import { toast } from 'react-toastify';
import { serverInstance } from '../../../API/ServerInstance';
import { backendApiUrl } from '../../../config/config';
import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  LOADING,
  USER_ALLDONATION,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../constants/action';

export const LoginwithOtp = (data, response) => {
  serverInstance('user/login-with-mobile', 'POST', data).then((res) => {
    response(res);
  });
};

export const VerifyOtp = (data, response) => {
  serverInstance('user/verify-opt', 'POST', data).then((res) => {
    response(res);
  });
};

export const User_AllDonation = (data, response) => {
  serverInstance('user/donation-list', 'GET', {}).then((res) => {
    try {
      response(res);
    } catch (error) {
      alert(res.message);
    }
  });
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      `${backendApiUrl}user/update-profile`,
      userData,
      config,
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//loader user
export const loadUser = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    const { data } = await axios.get(
      `${backendApiUrl}user/profile-list`,
      config,
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.profile,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin user
export const loadAdminprofile = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    const { data } = await axios.get(
      `${backendApiUrl}admin/update-admin-prof`,
      config,
    );
    console.log(data.data);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//emplyee user
export const loademployeeprofile = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    const { data } = await axios.get(
      `${backendApiUrl}admin/update-employee-prof `,
      config,
    );
    console.log('ddd', data.data);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
