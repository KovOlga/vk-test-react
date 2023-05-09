import {
  GET_CONF_DATA_REQUEST,
  GET_CONF_DATA_SUCCESS,
  GET_CONF_DATA_FAILED,
  SET_FORM_DATA_ON_CHANGE,
  SET_FORM_DATA_ON_TIME_CHANGE,
  SUBMIT_BOOKING_REQUEST,
  SUBMIT_BOOKING_SUCCESS,
  SUBMIT_BOOKING_FAILED,
} from "../actions";

const initialState = {
  dataRequest: false,
  dataLoading: false,
  dataFailed: false,
  towerData: [],
  floorData: [],
  confRoomData: [],

  form: {
    tower: "",
    floor: "",
    confRoom: "",
    date: "",
    time: {
      from: "09:00",
      to: "10:00",
    },
    comment: "",
  },

  bookingRequest: false,
  bookingLoading: false,
  bookingFailed: false,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONF_DATA_REQUEST: {
      return {
        ...state,
        dataRequest: true,
        dataLoading: true,
      };
    }
    case GET_CONF_DATA_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        dataLoading: false,
        floorData: action.defaultFloorList,
        confRoomData: action.defaultConfRoomList,
      };
    }
    case GET_CONF_DATA_FAILED: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: true,
        dataLoading: false,
      };
    }
    case SET_FORM_DATA_ON_CHANGE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value,
        },
      };
    }
    case SET_FORM_DATA_ON_TIME_CHANGE: {
      return {
        ...state,
        form: {
          ...state.form,
          time: {
            ...state.form.time,
            [action.name]: action.value,
          },
        },
      };
    }
    case SUBMIT_BOOKING_REQUEST: {
      return {
        ...state,
        bookingRequest: true,
        dataLoading: true,
      };
    }
    case SUBMIT_BOOKING_SUCCESS: {
      return {
        ...state,
        bookingRequest: false,
        bookingFailed: false,
        dataLoading: false,
      };
    }
    case SUBMIT_BOOKING_FAILED: {
      return {
        ...state,
        bookingRequest: false,
        bookingFailed: true,
        dataLoading: false,
      };
    }
    default:
      return state;
  }
};
