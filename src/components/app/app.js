import styles from "./app.module.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const defaultFloorList = Array.from(Array(25), (_, i) => i + 3);
  const defaultConfRoomList = Array.from(Array(10), (_, i) => i + 1);
  const defaultTimeList = [];
  const createDefaultTimeList = () => {
    for (let i = 9; i <= 18; i++) {
      defaultTimeList.push(`${i}:00`);
      defaultTimeList.push(`${i}:30`);
    }

    // console.log(hours);
  };

  createDefaultTimeList();

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
      data: date,
      time: {
        from: e.target.elements.timeFrom.value,
        to: e.target.elements.timeTo.value,
      },
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

  const [date, setStartDate] = useState(new Date());

  const [time, setTime] = useState({ from: "9:00", to: "9:00" });

  const handleTimeFromSelect = (e) => {
    setTime({ ...time, from: e.target.value });
  };

  const handleTimeToSelect = (e) => {
    setTime({ ...time, to: e.target.value });
  };

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

        <div>
          <h2>Дата</h2>

          <DatePicker
            selected={date}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
          />
        </div>

        <div>
          <h2>Время</h2>
          <h3>From</h3>
          <select
            name="timeFrom"
            value={time.from}
            onChange={handleTimeFromSelect}
          >
            {defaultTimeList.length > 0 &&
              defaultTimeList.map((fromTime, i) => {
                return (
                  <option key={i} value={fromTime}>
                    {fromTime}
                  </option>
                );
              })}
          </select>

          <h3>To</h3>
          <select name="timeTo" value={time.to} onChange={handleTimeToSelect}>
            {defaultTimeList.length > 0 &&
              defaultTimeList.map((toTime, i) => {
                return (
                  <option key={i} value={toTime}>
                    {toTime}
                  </option>
                );
              })}
          </select>
        </div>

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
