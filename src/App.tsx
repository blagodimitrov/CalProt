import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./components/ProgressBar.tsx";
import Calendar from "./components/Calendar.tsx";
import FatLoss from "./components/FatLoss.tsx";
import Journal from "./components/Journal.tsx";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [activity, setActivity] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2600);
  const [proteinGoal, setProteinGoal] = useState(120);
  const [dayTracker, setDayTracker] = useState(0); // track how many days are filled with data
  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <>
      <div className="Container">
        <div className="LeftColumn">
          <Calendar
            calorieGoal={calorieGoal}
            onDateChange={setSelectedDate}
            calories={calories}
            protein={protein}
            activity={activity}
            proteinGoal={proteinGoal}
          />
        </div>
        <div className="RightColumn">
          <Journal
            calorieGoal={calorieGoal}
            selectedDate={selectedDate}
            setCalories={setCalories}
            setProtein={setProtein}
            setActivity={setActivity}
          />
          <Progress
            calories={calories}
            protein={protein}
            calorieGoal={calorieGoal}
            proteinGoal={proteinGoal}
          />
          <FatLoss calories={calories} calorieGoal={calorieGoal} />
        </div>
      </div>
    </>
  );
}

export default App;
