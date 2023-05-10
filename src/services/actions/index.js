import Api from "../api/api";

export const GET_BOOKING_DATA_REQUEST = "GET_BOOKING_DATA_REQUEST";
export const GET_BOOKING_DATA_SUCCESS = "GET_BOOKING_DATA_SUCCESS";
export const GET_BOOKING_DATA_FAILED = "GET_BOOKING_DATA_FAILED";

export const SET_INITIAL_DATA = "SET_INITIAL_DATA";

export const SET_FORM_DATA_ON_CHANGE = "SET_FORM_DATA_ON_CHANGE";
export const SET_FORM_DATA_ON_TIME_CHANGE = "SET_FORM_DATA_ON_TIME_CHANGE";
export const SET_FORM_DATA_ON_DATE_CHANGE = "SET_FORM_DATA_ON_DATE_CHANGE";

export const SUBMIT_BOOKING_REQUEST = "SUBMIT_BOOKING_REQUEST";
export const SUBMIT_BOOKING_SUCCESS = "SUBMIT_BOOKING_SUCCESS";
export const SUBMIT_BOOKING_FAILED = "SUBMIT_BOOKING_FAILED";

export const WAS_ERROR = "WAS_ERROR";
export const SET_MODAL_VISIBILITY = "OPEN_MODAL";

export const RESET_FORM = "RESET_FORM";

const api = new Api();

export function getBookingData() {
  return function (dispatch) {
    dispatch({
      type: GET_BOOKING_DATA_REQUEST,
    });
    api
      .getBookingData()
      .then(({ defaultFloorList, defaultConfRoomList }) => {
        dispatch({
          type: GET_BOOKING_DATA_SUCCESS,
          defaultFloorList,
          defaultConfRoomList,
        });
      })
      .then(() => {
        dispatch({
          type: SET_INITIAL_DATA,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_BOOKING_DATA_FAILED,
        });
      });
  };
}

export function submitBooking() {
  const trimTimeZone = (date) => {
    const currentDate = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = new Date(
      `${year}-${month < 10 ? "0" + month : month}-${
        currentDate < 10 ? "0" + currentDate : currentDate
      }T00:00:00+00:00`
    );
    return newDate;
  };

  return function (dispatch, getState) {
    dispatch({
      type: SUBMIT_BOOKING_REQUEST,
    });
    api
      .postNewBooking()
      .then((res) => {
        dispatch({
          type: SUBMIT_BOOKING_SUCCESS,
        });

        const formData = getState().confRoomForm.form;

        const newBooking = {
          tower: formData.tower,
          floor: formData.floor,
          confRoom: formData.confRoom,
          date: trimTimeZone(formData.date),
          time: {
            from: formData.timeFrom,
            to: formData.timeTo,
          },
          comment: formData.comment,
        };
        console.log(JSON.stringify(newBooking));

        console.log(res);
      })
      .then(() => {
        dispatch({
          type: SET_MODAL_VISIBILITY,
          payload: true,
        });
      })
      .catch((e) => {
        dispatch({
          type: SUBMIT_BOOKING_FAILED,
        });
      });
  };
}
