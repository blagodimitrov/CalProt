import { useState } from "react";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import Table from "react-bootstrap/Table";

type CalendarProps = {
  onDateChange: (date: Date) => void;
  calories: number;
  protein: number;
  activity: number;
  calorieGoal: number;
  proteinGoal: number;
};

function Calendar({
  onDateChange,
  calories,
  protein,
  activity,
  proteinGoal,
  calorieGoal,
}: CalendarProps) {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
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

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Activity</th>
            <th>Allowed Calories</th>
            <th>Protein Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() =>
              handleDateClick(
                new Date(selectedMonthData.year, selectedMonthData.month - 1, 1)
              )
            }
          >
            <td>1</td>
            <td>{calories}</td>
            <td>{protein}</td>
            <td>{activity}</td>
            <td>{calories - calorieGoal}</td>
            <td>{protein - proteinGoal}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Calendar;
