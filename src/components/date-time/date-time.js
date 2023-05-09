import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import styles from "./date-time.module.css";

const DateTime = () => {
  const [date, setStartDate] = useState(new Date());

  const defaultTimeList = [];
  const createDefaultTimeList = () => {
    for (let i = 9; i <= 18; i++) {
      defaultTimeList.push(`${i}:00`);
      defaultTimeList.push(`${i}:30`);
    }
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
    <div className={styles.dateTime}>
      <h2 className={styles.dateTime__title}>Выбор даты и времени</h2>

      <div className={styles.field}>
        <h2 className={styles.field__title}>Дата</h2>

        <div>
          <DatePicker
            selected={date}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
          />
        </div>
      </div>

      <div className={styles.field}>
        <h2 className={styles.field__title}>Время</h2>
        <div className={styles.time}>
          <div className={`${styles.time__item} ${styles.time__item_from}`}>
            <h3 className={styles.time__title}>Начало</h3>
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
          </div>

          <div className={`${styles.time__item} ${styles.time__item_to}`}>
            <h3 className={styles.time__title}>Конец</h3>
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
      </div>
    </div>
  );
};

export default DateTime;
