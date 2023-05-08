import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DateTime = () => {
  const [date, setStartDate] = useState(new Date());

  const defaultTimeList = [];
  const createDefaultTimeList = () => {
    for (let i = 9; i <= 18; i++) {
      defaultTimeList.push(`${i}:00`);
      defaultTimeList.push(`${i}:30`);
    }

    // console.log(hours);
  };

  createDefaultTimeList();

  const [time, setTime] = useState({ from: "9:00", to: "9:00" });

  const handleTimeFromSelect = (e) => {
    setTime({ ...time, from: e.target.value });
  };

  const handleTimeToSelect = (e) => {
    setTime({ ...time, to: e.target.value });
  };

  return (
    <div>
      <div>
        <h2>Дата</h2>

        <DatePicker
          selected={date}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      <div>
        <h2>Время</h2>
        <h3>From</h3>
        <select
          name="timeFrom"
          value={time.from}
          onChange={handleTimeFromSelect}
        >
          {defaultTimeList.length > 0 &&
            defaultTimeList.map((fromTime, i) => {
              return (
                <option key={i} value={fromTime}>
                  {fromTime}
                </option>
              );
            })}
        </select>

        <h3>To</h3>
        <select name="timeTo" value={time.to} onChange={handleTimeToSelect}>
          {defaultTimeList.length > 0 &&
            defaultTimeList.map((toTime, i) => {
              return (
                <option key={i} value={toTime}>
                  {toTime}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default DateTime;
