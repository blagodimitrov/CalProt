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

  const handleDateClick = () => {
    const currentDay = new Date().getDate(); // Get the current day of the month
    const selectedDate = new Date(
      selectedMonthData.year,
      selectedMonthData.month - 1,
      currentDay
    );

    onDateChange(selectedDate);
  };

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Create a date object using the selected month, year, and current day
  const currentDay = new Date().getDate();
  const selectedDate = new Date(
    selectedMonthData.year,
    selectedMonthData.month - 1, // Month is zero-based in JavaScript Date
    currentDay
  );

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
            <th>Remaining Protein</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={handleDateClick}>
            <td>{selectedDate.getDate()}</td>
            <td
              style={{
                backgroundColor:
                  calories > calorieGoal % 25 ? "#f2999f" : "#99f2c1",
              }}
            >
              {calories}
            </td>
            <td
              style={{
                backgroundColor: protein < proteinGoal ? "#f2999f" : "#99f2c1",
              }}
            >
              {protein}
            </td>
            <td>{activity}</td>

            <td>{calorieGoal - calories}</td>
            <td>{protein - proteinGoal}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Calendar;
