import styles from "./app.module.css";
import { useState } from "react";
import Place from "../place/place";
import DateTime from "../date-time/date-time";
import { useSelector, useDispatch } from "react-redux";
import { submitBooking } from "../../services/actions";

function App() {
  const dispatch = useDispatch();
  const [textAreaState, setTextAreaState] = useState("");

  const handleTextAreaChange = (e) => {
    setTextAreaState(e.target.value);
  };

  const resetForm = () => {
    console.log("reset");
  };

  const date = useSelector((store) => store.confRoomForm.form.date);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(submitBooking());
    const newBooking = {
      tower: e.target.elements.tower.value,
      floor: e.target.elements.floor.value,
      confRoom: e.target.elements.confRoom.value,
      date: trimTimeZone(date),
      time: {
        from: e.target.elements.from.value,
        to: e.target.elements.to.value,
      },
      comment: e.target.elements.comment.value,
    };
    console.log(JSON.stringify(newBooking));
  };

  return (
    <div className={styles.app}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h1 className={styles.from__title}>Бронирование переговорной</h1>

        <Place />
        <DateTime />

        <textarea
          className={styles.textarea}
          name="comment"
          value={textAreaState}
          onChange={handleTextAreaChange}
          placeholder="Оставьте комментарий к бронированию"
        />

        <div className={styles.handlers}>
          <button className={styles.button} type="submit">
            Отправить
          </button>
          <button className={styles.button} type="reset" onClick={resetForm}>
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
