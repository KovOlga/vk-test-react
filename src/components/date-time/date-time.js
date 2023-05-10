import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import styles from "./date-time.module.css";
import {
  SET_FORM_DATA_ON_TIME_CHANGE,
  SET_FORM_DATA_ON_DATE_CHANGE,
} from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";
import { CalendarContainer } from "react-datepicker";

const DateTime = memo(() => {
  const dispatch = useDispatch();

  const timeFrom = useSelector((store) => store.confRoomForm.form.time.from);
  const timeTo = useSelector((store) => store.confRoomForm.form.time.to);
  const date = useSelector((store) => store.confRoomForm.form.date);

  const inputRef = useRef();

  const hideInputError = () => {
    inputRef.current.textContent = "";
  };

  const showInputError = (errorMessage) => {
    inputRef.current.textContent = errorMessage;
  };

  const validateTimeInput = (event) => {
    return timeFrom.split(":")[0] < 9 || timeTo.split(":")[0] > 18;
  };

  const validateTimeInterval = (event) => {
    return (
      timeFrom.split(":")[0] * 60 + timeFrom.split(":")[1] >=
      timeTo.split(":")[0] * 60 + timeTo.split(":")[1]
    );
  };

  const onChangeTime = (e) => {
    hideInputError();
    dispatch({
      type: SET_FORM_DATA_ON_TIME_CHANGE,
      name: e.target.name,
      value: e.target.value,
    });
    console.log(timeFrom, timeTo);
    if (validateTimeInput(e)) {
      showInputError("Выберете время с 9 до 19");
    }
    if (validateTimeInterval(e)) {
      showInputError("Поменяйте начало и конец");
    }
  };

  const handleDateChange = (date) => {
    dispatch({ type: SET_FORM_DATA_ON_DATE_CHANGE, date });
  };

  useEffect(() => {
    const date = new Date();
    dispatch({ type: SET_FORM_DATA_ON_DATE_CHANGE, date });
  }, []);

  return (
    <div className={styles.dateTime}>
      <h2 className={styles.dateTime__title}>Выбор даты и времени</h2>

      <div className={styles.field}>
        <h2 className={styles.field__title}>Дата</h2>

        <div className={styles.date}>
          {date !== "" && (
            <DatePicker
              selected={date}
              onChange={(date) => handleDateChange(date)}
              dateFormat="dd-MM-yyyy"
              calendarContainer={MyContainer}
              className={styles.date__input}
              shouldCloseOnSelect={false}
              minDate={new Date()}
            />
          )}
        </div>
      </div>

      <div className={styles.field}>
        <h2 className={styles.field__title}>Время</h2>
        <div className={styles.time}>
          <div className={`${styles.time__item} ${styles.time__item_from}`}>
            <h3 className={styles.time__title}>Начало</h3>

            <input
              className={styles.input}
              name="from"
              type="time"
              value={timeFrom}
              onChange={onChangeTime}
            ></input>
          </div>

          <div className={`${styles.time__item} ${styles.time__item_to}`}>
            <h3 className={styles.time__title}>Конец</h3>

            <input
              className={styles.input}
              name="to"
              type="time"
              value={timeTo}
              onChange={onChangeTime}
            ></input>
          </div>
          <span ref={inputRef} className={styles.error}></span>
        </div>
      </div>
    </div>
  );
});

const MyContainer = ({ className, children }) => {
  return (
    <div className={styles.date__container}>
      <CalendarContainer className={className}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

export default DateTime;
