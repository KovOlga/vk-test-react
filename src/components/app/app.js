import styles from "./app.module.css";
import { useState, useEffect } from "react";
import TowerSelect from "../tower-select/tower-select";
import FloorSelect from "../floor-select/floor-select";
import RoomSelect from "../room-select/room-select";
import DateSelect from "../date-select/date-select";
import TimeSelect from "../time-select/time-select";

function App() {
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
      // data: date,
      time: {
        from: e.target.elements.timeFrom.value,
        to: e.target.elements.timeTo.value,
      },
      comment: e.target.elements.comment.value,
    };
    console.log(JSON.stringify(newBooking));
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <h1>Выбор переговорной</h1>

        <TowerSelect />
        <FloorSelect />
        <RoomSelect />
        <DateSelect />
        <TimeSelect />

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
