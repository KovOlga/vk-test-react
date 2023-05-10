import {
  GET_BOOKING_DATA_REQUEST,
  SET_INITIAL_DATA,
  GET_BOOKING_DATA_SUCCESS,
  GET_BOOKING_DATA_FAILED,
  SET_FORM_DATA_ON_CHANGE,
  SET_FORM_DATA_ON_TIME_CHANGE,
  SET_FORM_DATA_ON_DATE_CHANGE,
  SUBMIT_BOOKING_REQUEST,
  SUBMIT_BOOKING_SUCCESS,
  SUBMIT_BOOKING_FAILED,
  WAS_ERROR,
  SET_MODAL_VISIBILITY,
} from "../actions";

const initialState = {
  dataRequest: false,
  dataLoading: false,
  dataFailed: false,
  floorData: [],
  confRoomData: [],

  form: {
    tower: "",
    floor: "",
    confRoom: "",
    date: "",
    time: {
      from: "",
      to: "",
    },
    comment: "",
  },

  bookingRequest: false,
  bookingLoading: false,
  bookingFailed: false,

  wasError: false,
  isModalOpen: false,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_DATA_REQUEST: {
      return {
        ...state,
        dataRequest: true,
        dataLoading: true,
      };
    }
    case GET_BOOKING_DATA_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        dataLoading: false,
        floorData: action.defaultFloorList,
        confRoomData: action.defaultConfRoomList,
      };
    }
    case SET_INITIAL_DATA: {
      return {
        ...state,
        form: {
          ...state.form,
          tower: "А",
          floor: "3",
          confRoom: "1",
          time: {
            from: "09:00",
            to: "10:00",
          },
          comment: "",
          date: new Date(),
        },
        wasError: false,
      };
    }
    case GET_BOOKING_DATA_FAILED: {
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
    case SET_FORM_DATA_ON_DATE_CHANGE: {
      return {
        ...state,
        form: {
          ...state.form,
          date: action.date,
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
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }
    case WAS_ERROR: {
      return {
        ...state,
        wasError: action.payload,
      };
    }
    default:
      return state;
  }
};
