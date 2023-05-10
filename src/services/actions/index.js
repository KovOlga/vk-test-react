import Api from "../api/api";

export const GET_CONF_DATA_REQUEST = "GET_CONF_DATA_REQUEST";
export const GET_CONF_DATA_SUCCESS = "GET_CONF_DATA_SUCCESS";
export const GET_CONF_DATA_FAILED = "GET_CONF_DATA_FAILED";

export const SET_FORM_DATA_ON_CHANGE = "SET_FORM_DATA_ON_CHANGE";
export const SET_FORM_DATA_ON_TIME_CHANGE = "SET_FORM_DATA_ON_TIME_CHANGE";
export const SET_FORM_DATA_ON_DATE_CHANGE = "SET_FORM_DATA_ON_DATE_CHANGE";

export const SUBMIT_BOOKING_REQUEST = "SUBMIT_BOOKING_REQUEST";
export const SUBMIT_BOOKING_SUCCESS = "SUBMIT_BOOKING_SUCCESS";
export const SUBMIT_BOOKING_FAILED = "SUBMIT_BOOKING_FAILED";

const api = new Api();

export function getBookingData() {
  return function (dispatch) {
    dispatch({
      type: GET_CONF_DATA_REQUEST,
    });
    api
      .getBookingData()
      .then(({ defaultFloorList, defaultConfRoomList }) => {
        dispatch({
          type: GET_CONF_DATA_SUCCESS,
          defaultFloorList,
          defaultConfRoomList,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_CONF_DATA_FAILED,
        });
      });
  };
}

export function submitBooking() {
  return function (dispatch) {
    dispatch({
      type: SUBMIT_BOOKING_REQUEST,
    });
    api
      .postNewBooking()
      .then((res) => {
        dispatch({
          type: SUBMIT_BOOKING_SUCCESS,
        });
        console.log(res);
      })
      .catch((e) => {
        dispatch({
          type: SUBMIT_BOOKING_FAILED,
        });
      });
  };
}
