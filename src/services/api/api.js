import { Component } from "react";
import {
  defaultFloorList,
  defaultConfRoomList,
} from "../../utils/dummy-data-fetcher";

class Api extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://baseURL";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this.getResponse);
  }

  getBookingData = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          defaultFloorList: defaultFloorList,
          defaultConfRoomList: defaultConfRoomList,
        });
      }, 400);
    });

    promise.then(
      (result) => {
        return result;
      },
      (error) => {
        console.log(error);
      }
    );

    return promise;
  };

  postNewBooking = (bookingData) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("booked");
      }, 100);
    });

    promise.then(
      (result) => {
        return result;
      },
      (error) => {
        console.log(error);
      }
    );

    return promise;
  };
}

export default Api;
