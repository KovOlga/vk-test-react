import { useState } from "react";
import styles from "./place.module.css";

const Place = () => {
  const [tower, setTower] = useState("A");

  const handleTowerSelect = (e) => {
    setTower(e.target.value);
  };

  const defaultFloorList = Array.from(Array(25), (_, i) => i + 3);
  const [floor, setFloor] = useState("3");

  const handleFloorSelect = (e) => {
    setFloor(e.target.value);
  };

  const [floorList, setFloorList] = useState(defaultFloorList);

  const defaultConfRoomList = Array.from(Array(10), (_, i) => i + 1);
  const [confRoom, setConfRoom] = useState("1");

  const handleConfRomSelect = (e) => {
    setConfRoom(e.target.value);
  };

  const [confRoomList, setConfRoomList] = useState(defaultConfRoomList);

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Выбор башни</h2>
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

      <div>
        <h2>Выбор этажа</h2>

        <select name="floor" value={floor} onChange={handleFloorSelect}>
          {floorList.length > 0 &&
            floorList.map((floorNumber) => {
              return (
                <option key={floorNumber} value={floorNumber}>
                  Этаж {floorNumber}
                </option>
              );
            })}
        </select>
      </div>

      <div>
        <h2>Выбор переговорки</h2>

        <select name="confRoom" value={confRoom} onChange={handleConfRomSelect}>
          {defaultConfRoomList.length > 0 &&
            defaultConfRoomList.map((confRoomNumber) => {
              return (
                <option key={confRoomNumber} value={confRoomNumber}>
                  Переговорка №: {confRoomNumber}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Place;
