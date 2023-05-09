import Api from "../api/api";

export const GET_CONF_DATA_REQUEST = "GET_CONF_DATA_REQUEST";
export const GET_CONF_DATA_SUCCESS = "GET_CONF_DATA_SUCCESS";
export const GET_CONF_DATA_FAILED = "GET_CONF_DATA_FAILED";

const api = new Api();

export function getConfRoomData() {
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