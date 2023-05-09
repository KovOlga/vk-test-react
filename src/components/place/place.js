import { useState, useEffect } from "react";
import styles from "./place.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getConfRoomData } from "../../services/actions/index";

const Place = () => {
  const dispatch = useDispatch();
  const floorArr = useSelector((store) => store.confRoomForm.floorData);
  const confRoomArr = useSelector((store) => store.confRoomForm.confRoomData);

  const [tower, setTower] = useState("A");

  const handleTowerSelect = (e) => {
    setTower(e.target.value);
  };

  const [floor, setFloor] = useState("3");
  const handleFloorSelect = (e) => {
    setFloor(e.target.value);
  };

  const [confRoom, setConfRoom] = useState("1");
  const handleConfRomSelect = (e) => {
    setConfRoom(e.target.value);
  };

  useEffect(() => {
    dispatch(getConfRoomData());
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
            onChange={handleTowerSelect}
          >
            <option value="A">Башня А</option>
            <option value="B">Башня Б</option>
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
            onChange={handleFloorSelect}
          >
            {floorArr.length > 0 &&
              floorArr.map((floorNumber) => {
                return (
                  <option key={floorNumber} value={floorNumber}>
                    Этаж {floorNumber}
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
            onChange={handleConfRomSelect}
          >
            {confRoomArr.length > 0 &&
              confRoomArr.map((confRoomNumber) => {
                return (
                  <option key={confRoomNumber} value={confRoomNumber}>
                    Переговорка №: {confRoomNumber}
                  </option>
                );
              })}
          </select>
          <span className={styles.customArrow}></span>
        </label>
      </div>
    </div>
  );
};

export default Place;
