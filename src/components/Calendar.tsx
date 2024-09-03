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

function Calendar({ onDateChange, proteinGoal, calorieGoal }: CalendarProps) {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const isCurrentMonth =
    selectedMonthData.month === currentMonth &&
    selectedMonthData.year === currentYear;

  const handleMonthChange = (newMonthData: { month: number; year: number }) => {
    if (
      newMonthData.year < currentYear ||
      (newMonthData.year === currentYear && newMonthData.month <= currentMonth)
    ) {
      setSelectedMonthData(newMonthData);
    }
  };

  const daysInMonth = new Date(
    selectedMonthData.year,
    selectedMonthData.month,
    0
  ).getDate();

  const generateDateRows = () => {
    const rows = [];
    const lastDay = isCurrentMonth ? today.getDate() : daysInMonth;

    for (let day = lastDay; day >= 1; day--) {
      const date = new Date(
        selectedMonthData.year,
        selectedMonthData.month - 1,
        day
      );

      const dateKey = date.toLocaleDateString();
      const savedData = localStorage.getItem(dateKey);

      let dayCalories = 0;
      let dayProtein = 0;
      let dayActivity = 0;

      if (savedData) {
        const { meals, activities } = JSON.parse(savedData);
        dayActivity = activities.reduce(
          (acc: number, activity: any) =>
            acc + parseFloat(activity.activityBurntCalories || "0"),
          0
        );
        dayCalories =
          meals.reduce(
            (acc: number, meal: any) =>
              acc + parseFloat(meal.mealCalories || "0"),
            0
          ) - dayActivity;
        dayProtein = meals.reduce(
          (acc: number, meal: any) => acc + parseFloat(meal.mealProtein || "0"),
          0
        );
      }

      rows.push(
        <tr key={dateKey} onClick={() => onDateChange(date)}>
          <td>{day}</td>
          <td
            style={{
              backgroundColor:
                dayCalories > calorieGoal ? "#f2999f" : "#99f2c1",
            }}
          >
            {dayCalories || 0}
          </td>
          <td
            style={{
              backgroundColor: dayProtein < proteinGoal ? "#f2999f" : "#99f2c1",
            }}
          >
            {dayProtein || 0}
          </td>
          <td>{dayActivity || 0}</td>
          <td>{calorieGoal - dayCalories}</td>
          <td>{dayProtein - proteinGoal}</td>
        </tr>
      );
    }
    return rows;
  };

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
            onChange={handleMonthChange}
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
        <tbody>{generateDateRows()}</tbody>
      </Table>
    </div>
  );
}

export default Calendar;
