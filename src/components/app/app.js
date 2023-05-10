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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(submitBooking());
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
