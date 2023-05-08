import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DateSelect = () => {
  const [date, setStartDate] = useState(new Date());

  return (
    <>
      <h2>Дата</h2>

      <DatePicker
        selected={date}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd-MM-yyyy"
      />
    </>
  );
};

export default DateSelect;
