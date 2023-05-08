import { useState } from "react";

const TowerSelect = () => {
  const [tower, setTower] = useState("A");

  const handleTowerSelect = (e) => {
    setTower(e.target.value);
  };

  return (
    <>
      <h2>Выбор башни</h2>

      <select name="tower" value={tower} onChange={handleTowerSelect}>
        <option value="A">Башня А</option>
        <option value="B">Башня Б</option>
      </select>
    </>
  );
};

export default TowerSelect;
