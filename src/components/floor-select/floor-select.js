import { useState } from "react";

const FloorSelect = () => {
  const defaultFloorList = Array.from(Array(25), (_, i) => i + 3);
  const [floor, setFloor] = useState("3");

  const handleFloorSelect = (e) => {
    setFloor(e.target.value);
  };

  const [floorList, setFloorList] = useState(defaultFloorList);

  return (
    <>
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
    </>
  );
};

export default FloorSelect;
