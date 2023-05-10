import { useEffect } from "react";
import styles from "./place.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBookingData } from "../../services/actions/index";
import { memo } from "react";

const Place = memo(({ handleInputChange }) => {
  const dispatch = useDispatch();
  const floorArr = useSelector((store) => store.confRoomForm.floorData);
  const confRoomArr = useSelector((store) => store.confRoomForm.confRoomData);

  const tower = useSelector((store) => store.confRoomForm.form.tower);
  const floor = useSelector((store) => store.confRoomForm.form.floor);
  const confRoom = useSelector((store) => store.confRoomForm.form.confRoom);

  useEffect(() => {
    dispatch(getBookingData());
  }, []);

  return (
    <div className={styles.place}>
      <h2 className={styles.place__title}>Выбор места</h2>
      <div className={styles.field}>
        <h2 className={styles.title}>Башня</h2>
        <label htmlFor="tower" className={styles.label}>
          <select
            className={styles.select}
            id="tower"
            name="tower"
            value={tower}
            onChange={handleInputChange}
          >
            <option value="A">А</option>
            <option value="Б">Б</option>
          </select>
          <span className={styles.customArrow}></span>
        </label>
      </div>

      <div className={styles.field}>
        <h2 className={styles.title}>Этаж</h2>
        <label htmlFor="floor" className={styles.label}>
          <select
            className={styles.select}
            id="floor"
            name="floor"
            value={floor}
            onChange={handleInputChange}
          >
            {floorArr.length > 0 &&
              floorArr.map((floorNumber) => {
                return (
                  <option key={floorNumber} value={floorNumber}>
                    {floorNumber}
                  </option>
                );
              })}
          </select>
          <span className={styles.customArrow}></span>
        </label>
      </div>

      <div className={styles.field}>
        <h2 className={styles.title}>Переговорка</h2>
        <label htmlFor="confRoom" className={styles.label}>
          <select
            className={styles.select}
            id="confRoom"
            name="confRoom"
            value={confRoom}
            onChange={handleInputChange}
          >
            {confRoomArr.length > 0 &&
              confRoomArr.map((confRoomNumber) => {
                return (
                  <option key={confRoomNumber} value={confRoomNumber}>
                    № {confRoomNumber}
                  </option>
                );
              })}
          </select>
          <span className={styles.customArrow}></span>
        </label>
      </div>
    </div>
  );
});

export default Place;
