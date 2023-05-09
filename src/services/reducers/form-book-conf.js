import {
  GET_CONF_DATA_REQUEST,
  GET_CONF_DATA_SUCCESS,
  GET_CONF_DATA_FAILED,
  SET_FORM_DATA_ON_CHANGE,
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
      from: "",
      to: ",",
    },
    comment: "",
  },
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
      console.log(action);
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    default:
      return state;
  }
};
