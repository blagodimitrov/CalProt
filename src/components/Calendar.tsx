import { useState } from "react";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import Table from 'react-bootstrap/Table';

function Calendar() {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <>
      <div className="container">
        <div className="MonthContainer" style={{ width: "200px" }}>
          <MonthInput
            selected={selectedMonthData}
            setShowMonthPicker={setIsPickerOpen}
            showMonthPicker={isPickerOpen}
            size="small"
          />
          {isPickerOpen ? (
            <MonthPicker
              setIsOpen={setIsPickerOpen}
              selected={selectedMonthData}
              onChange={setSelectedMonthData}
              bgColorMonthActive="pink"
              size="small"
            />
          ) : null}
        </div>
      </div>

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Activity</th>
          <th>Cal. Ratio</th>
          <th>Prot. Ratio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01</td>
          <td>2300</td>
          <td>80</td>
          <td>-200</td>
          <td>-350</td>
          <td>-65.5</td>
        </tr>
      </tbody>
    </Table>



    </>
  );
}

export default Calendar;
