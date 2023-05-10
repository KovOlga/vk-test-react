import styles from "./app.module.css";
import { useState } from "react";
import Place from "../place/place";
import DateTime from "../date-time/date-time";
import { useSelector, useDispatch } from "react-redux";
import { submitBooking } from "../../services/actions";
import Modal from "../modal/modal";
import { SET_MODAL_VISIBILITY } from "../../services/actions";

const modalRoot = document.getElementById("react-modals");

function App() {
  const dispatch = useDispatch();
  const wasError = useSelector((store) => store.confRoomForm.wasError);
  const isModalOpen = useSelector((store) => store.confRoomForm.isModalOpen);
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

  const onModalClose = () => {
    dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
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
      {isModalOpen && (
        <Modal onClose={onModalClose} container={modalRoot}>
          <div className={styles.modal}>
            <h2 className={styles.modal__text}>Произошла ошибка</h2>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
