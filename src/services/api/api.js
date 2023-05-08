import React from "react";

class Api extends React.Component {
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

  postNewBooking = (bookingData) => {
    return this._request(`${this.baseUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        data: bookingData,
      }),
    });
  };
}

export default Api;
