import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./components/ProgressBar";
import Calendar from "./components/Calendar";
import FatLoss from "./components/FatLoss";
import Journal from "./components/Journal";
import { useState, useEffect } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [activity, setActivity] = useState(0);
  const [calorieGoal] = useState(2600);
  const [proteinGoal] = useState(120);
  const [activities, setActivities] = useState<
    { activityName: string; activityBurntCalories: string }[]
  >([]);
  const [meals, setMeals] = useState<
    { mealName: string; mealCalories: string; mealProtein: string }[]
  >([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCalorieGoal, setTotalCalorieGoal] = useState(0);

  // Load data from localStorage on date change
  useEffect(() => {
    const dateKey = selectedDate.toLocaleDateString();
    const savedData = localStorage.getItem(dateKey);

    if (savedData) {
      const { meals, activities } = JSON.parse(savedData);
      setMeals(meals || []);
      setActivities(activities || []);
      updateCaloriesAndProtein(meals, activities);
    } else {
      setMeals([]);
      setActivities([]);
      setCalories(0);
      setProtein(0);
      setActivity(0);
    }
  }, [selectedDate]);

  // Calculate total calories and goals for the current month
  useEffect(() => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    let accumulatedCalories = 0;
    let daysWithData = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const dateKey = date.toLocaleDateString();
      const savedData = localStorage.getItem(dateKey);

      if (savedData) {
        daysWithData += 1;
        const { meals, activities } = JSON.parse(savedData);
        const dailyActivity = activities.reduce(
          (acc: any, activity: any) =>
            acc + parseFloat(activity.activityBurntCalories || "0"),
          0
        );
        const dailyCalories =
          meals.reduce(
            (acc: any, meal: any) => acc + parseFloat(meal.mealCalories || "0"),
            0
          ) - dailyActivity;

        accumulatedCalories += dailyCalories;
      }
    }

    const totalGoal = calorieGoal * daysWithData;
    setTotalCalories(accumulatedCalories);
    setTotalCalorieGoal(totalGoal);
  }, [selectedDate, calorieGoal]);

  const updateCaloriesAndProtein = (meals: any[], activities: any[]) => {
    const totalActivity = activities.reduce(
      (acc, activity) =>
        acc + parseFloat(activity.activityBurntCalories || "0"),
      0
    );
    const totalCalories =
      meals.reduce(
        (acc, meal) => acc + parseFloat(meal.mealCalories || "0"),
        0
      ) - totalActivity;
    const totalProtein = meals.reduce(
      (acc, meal) => acc + parseFloat(meal.mealProtein || "0"),
      0
    );

    setCalories(totalCalories);
    setActivity(totalActivity);
    setProtein(totalProtein);
  };

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
            meals={meals}
            activities={activities}
            setMeals={setMeals}
            setActivities={setActivities}
          />
          <Progress
            calories={calories}
            protein={protein}
            calorieGoal={calorieGoal}
            proteinGoal={proteinGoal}
          />
          <FatLoss calories={totalCalories} calorieGoal={totalCalorieGoal} />
        </div>
      </div>
    </>
  );
}

export default App;
