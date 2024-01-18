import {
  GET_ELE_REQUEST,
  GET_ELE_SUCCESS,
  GET_ELE_FAIL,
  GET_MANUAL_REQUEST,
  GET_MANUAL_SUCCESS,
  GET_MANUAL_FAIL,
  GET_ONLINE_REQUEST,
  GET_ONLINE_SUCCESS,
  GET_ONLINE_FAIL,
  GET_GUEST_REQUEST,
  GET_GUEST_SUCCESS,
  GET_GUEST_FAIL,
  GET_ONLINE_ROOM_REQUEST,
  GET_ONLINE_ROOM_SUCCESS,
  GET_ONLINE_ROOM_FAIL,
  GET_ROOM_BOOKING_REQUEST,
  GET_ROOM_BOOKING_SUCCESS,
  GET_ROOM_BOOKING_FAIL,
} from '../../redux/constants/dashboard';

export default function elecReducer(state = { elecdata: {} }, action) {
  switch (action.type) {
    case GET_ELE_REQUEST:
      return {
        ...state,
        LOADING: true,
      };

    case GET_ELE_SUCCESS:
      return {
        ...state,
        LOADING: false,
        isUpdated: action.payload,
      };

    case GET_ELE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}



export default function manualReducer(state = { manualdata: {} }, action) {
    switch (action.type) {
      case GET_MANUAL_REQUEST:
        return {
          ...state,
          LOADING: true,
        };
  
      case GET_MANUAL_SUCCESS:
        return {
          ...state,
          LOADING: false,
          isUpdated: action.payload,
        };
  
      case GET_MANUAL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  


export default function onlineReducer(state = { onlinedata: {} }, action) {
    switch (action.type) {
      case GET_ONLINE_REQUEST:
        return {
          ...state,
          LOADING: true,
        };
  
      case GET_ONLINE_SUCCESS:
        return {
          ...state,
          LOADING: false,
          isUpdated: action.payload,
        };
  
      case GET_ONLINE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  