import { toast } from 'react-toastify';
import { serverInstance } from '../../../API/ServerInstance';
import { backendApiUrl } from '../../../config/config';
import axios from 'axios';
import {
  GET_ELE_REQUEST,
  GET_ELE_SUCCESS,
  GET_ELE_FAIL,
  GET_GUEST_REQUEST,
  GET_GUEST_SUCCESS,
  GET_GUEST_FAIL,
  GET_MANUAL_REQUEST,
  GET_MANUAL_SUCCESS,
  GET_MANUAL_FAIL,
  GET_ONLINE_REQUEST,
  GET_ONLINE_SUCCESS,
  GET_ONLINE_FAIL,
  GET_ONLINE_ROOM_REQUEST,
  GET_ONLINE_ROOM_SUCCESS,
  GET_ONLINE_ROOM_FAIL,
  GET_ROOM_BOOKING_REQUEST,
  GET_ROOM_BOOKING_SUCCESS,
  GET_ROOM_BOOKING_FAIL,
} from '../constants/dashboard';

export const GETELECTRONIC = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: GET_ELE_REQUEST });

    const res = await axios.get(`${backendApiUrl}admin/dash-admin-total-elec`);

    dispatch({
      type: GET_ELE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ELE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const GETMANUAL = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: GET_MANUAL_REQUEST });

    const res = await axios.get(
      `${backendApiUrl}admin/dash-admin-total-manual`,
    );

    dispatch({
      type: GET_MANUAL_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MANUAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const GETONLINE = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    dispatch({ type: GET_ONLINE_REQUEST });

    const res = await axios.get(
      `${backendApiUrl}admin/dash-admin-total-online`,
    );

    dispatch({
      type: GET_ONLINE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ONLINE_FAIL,
      payload: error.response.data.message,
    });
  }
};
