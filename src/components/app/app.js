import styles from "./app.module.css";
import { useState, useEffect } from "react";

function App() {
  const defaultFloorList = Array.from(Array(25), (_, i) => i + 3);
  const defaultConfRoomList = Array.from(Array(10), (_, i) => i + 1);

  const [textAreaState, setTextAreaState] = useState("");

  const resetForm = () => {
    console.log("reset");
  };

  const handleTextAreaChange = (e) => {
    setTextAreaState(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      tower: e.target.elements.tower.value,
      floor: e.target.elements.floor.value,
      confRoom: e.target.elements.confRoom.value,
      // data: e.target.elements.data.value,
      comment: e.target.elements.comment.value,
    };
    console.log(JSON.stringify(newBooking));
  };

  const [tower, setTower] = useState("A");

  const handleTowerSelect = (e) => {
    setTower(e.target.value);
  };

  const [floor, setFloor] = useState("3");

  const handleFloorSelect = (e) => {
    setFloor(e.target.value);
  };

  const [floorList, setFloorList] = useState(defaultFloorList);

  const [confRoom, setConfRoom] = useState("1");

  const handleConfRomSelect = (e) => {
    setConfRoom(e.target.value);
  };

  const [confRoomList, setConfRoomList] = useState(defaultConfRoomList);

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <h1>Выбор переговорной</h1>
        <div>
          <h2>Выбор башни</h2>

          <select name="tower" value={tower} onChange={handleTowerSelect}>
            <option value="A">Башня А</option>
            <option value="B">Башня Б</option>
          </select>
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

          <select
            name="confRoom"
            value={confRoom}
            onChange={handleConfRomSelect}
          >
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

        <h2>Дата</h2>

        <div>
          <h2>Поле для комментария</h2>
          <textarea
            name="comment"
            value={textAreaState}
            onChange={handleTextAreaChange}
          />
        </div>

        <button type="submit">Отправить</button>
        <button type="reset" onClick={resetForm}>
          Очистить
        </button>
      </form>
    </div>
  );
}

export default App;
