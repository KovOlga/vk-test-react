import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useEffect } from "react";
import styles from "./date-time.module.css";
import {
  SET_FORM_DATA_ON_TIME_CHANGE,
  SET_FORM_DATA_ON_DATE_CHANGE,
  WAS_ERROR,
} from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";
import { CalendarContainer } from "react-datepicker";

const DateTime = memo(() => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const startHourConstraint = 9;
  const endHourConstraint = 19;
  const timeFrom = useSelector((store) => store.confRoomForm.form.time.from);
  const timeTo = useSelector((store) => store.confRoomForm.form.time.to);
  const date = useSelector((store) => store.confRoomForm.form.date);

  const hideInputError = () => {
    inputRef.current.textContent = "";
  };
  const showInputError = (errorMessage) => {
    inputRef.current.textContent = errorMessage;
  };

  useEffect(() => {
    const date = new Date();
    dispatch({ type: SET_FORM_DATA_ON_DATE_CHANGE, date });
  }, []);

  const validateTimeInput = (timeFrom, timeTo) => {
    const isStartIncorrect =
      Number(timeFrom.split(":")[0]) * 60 +
        Number(timeFrom.split(":")[1]) -
        startHourConstraint * 60 <
      0;
    const isEndIncorrect =
      Number(timeTo.split(":")[0]) * 60 +
        Number(timeTo.split(":")[1]) -
        endHourConstraint * 60 >
      0;
    return isStartIncorrect || isEndIncorrect;
  };

  const validateTimeInterval = (timeFrom, timeTo) => {
    return (
      Number(timeFrom.split(":")[0]) * 60 + Number(timeFrom.split(":")[1]) >=
      Number(timeTo.split(":")[0]) * 60 + Number(timeTo.split(":")[1])
    );
  };

  useEffect(() => {
    if (validateTimeInput(timeFrom, timeTo)) {
      showInputError(
        `Выберите время с ${startHourConstraint} до ${endHourConstraint}`
      );
      dispatch({ type: WAS_ERROR, payload: true });
    }
    if (validateTimeInterval(timeFrom, timeTo)) {
      showInputError("Некорректный интервал");
      dispatch({ type: WAS_ERROR, payload: true });
    }
  }, [timeFrom, timeTo]);

  const handleTimeChange = (e) => {
    hideInputError();
    dispatch({ type: WAS_ERROR, payload: false });
    dispatch({
      type: SET_FORM_DATA_ON_TIME_CHANGE,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    dispatch({ type: SET_FORM_DATA_ON_DATE_CHANGE, date });
  };

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
              onChange={handleTimeChange}
            ></input>
          </div>

          <div className={`${styles.time__item} ${styles.time__item_to}`}>
            <h3 className={styles.time__title}>Конец</h3>

            <input
              className={styles.input}
              name="to"
              type="time"
              value={timeTo}
              onChange={handleTimeChange}
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
