import styles from "./app.module.css";
import Place from "../place/place";
import DateTime from "../date-time/date-time";
import { useSelector, useDispatch } from "react-redux";
import { submitBooking } from "../../services/actions";
import Modal from "../modal/modal";
import {
  SET_MODAL_VISIBILITY,
  RESET_FORM,
  SET_FORM_DATA_ON_CHANGE,
} from "../../services/actions";
import { useCallback } from "react";

const modalRoot = document.getElementById("react-modals");

function App() {
  const dispatch = useDispatch();
  const wasError = useSelector((store) => store.confRoomForm.wasError);
  const isModalOpen = useSelector((store) => store.confRoomForm.isModalOpen);
  const textAreaState = useSelector((store) => store.confRoomForm.form.comment);

  const handleInputChange = useCallback((e) => {
    dispatch({
      type: SET_FORM_DATA_ON_CHANGE,
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const resetForm = (e) => {
    e.preventDefault();
    dispatch({ type: RESET_FORM });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(submitBooking());
  };

  const onModalClose = () => {
    dispatch({ type: SET_MODAL_VISIBILITY, payload: false });
    dispatch({ type: RESET_FORM });
  };

  return (
    <div className={styles.app}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h1 className={styles.from__title}>Бронирование переговорной</h1>

        <Place handleInputChange={handleInputChange} />
        <DateTime />

        <textarea
          className={styles.textarea}
          name="comment"
          value={textAreaState}
          onChange={handleInputChange}
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
