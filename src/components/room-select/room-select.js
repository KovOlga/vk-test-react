import { useState } from "react";

const RoomSelect = () => {
  const defaultConfRoomList = Array.from(Array(10), (_, i) => i + 1);
  const [confRoom, setConfRoom] = useState("1");

  const handleConfRomSelect = (e) => {
    setConfRoom(e.target.value);
  };

  const [confRoomList, setConfRoomList] = useState(defaultConfRoomList);

  return (
    <>
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
    </>
  );
};

export default RoomSelect;
