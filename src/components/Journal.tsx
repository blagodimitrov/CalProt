import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

type JournalProps = {
  selectedDate: Date;
  setCalories: (calories: number) => void;
  setProtein: (protein: number) => void;
  calorieGoal: number;
  setActivity: (activity: number) => void;
  activities: { activityName: string; activityBurntCalories: string }[];
  meals: { mealName: string; mealCalories: string; mealProtein: string }[];
  setMeals: (
    meals: { mealName: string; mealCalories: string; mealProtein: string }[]
  ) => void;
  setActivities: (
    activities: { activityName: string; activityBurntCalories: string }[]
  ) => void;
};

function Journal({
  selectedDate,
  setCalories,
  setProtein,
  setActivity,
  activities,
  meals,
  setMeals,
  setActivities,
}: JournalProps) {
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [mealProtein, setMealProtein] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityBurntCalories, setActivityBurntCalories] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (
        !mealName.trim() ||
        !mealCalories.trim() ||
        !/^\d+$/.test(mealCalories) ||
        !mealProtein.trim() ||
        !/^\d+$/.test(mealProtein)
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const newMeal = {
        mealName,
        mealCalories,
        mealProtein,
      };

      const updatedMeals = [...meals, newMeal];
      setMeals(updatedMeals);

      // Update localStorage
      const dateKey = selectedDate.toLocaleDateString();
      localStorage.setItem(
        dateKey,
        JSON.stringify({ meals: updatedMeals, activities })
      );

      setMealName("");
      setMealCalories("");
      setMealProtein("");
    }
  };

  const handleKeyPressActivity = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (
        !activityName.trim() ||
        !activityBurntCalories.trim() ||
        !/^\d+$/.test(activityBurntCalories)
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const newActivity = {
        activityName,
        activityBurntCalories,
      };

      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);

      // Update localStorage
      const dateKey = selectedDate.toLocaleDateString();
      localStorage.setItem(
        dateKey,
        JSON.stringify({ meals, activities: updatedActivities })
      );

      setActivityName("");
      setActivityBurntCalories("");
    }
  };

  const handleDeleteMeal = (index: number) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);

    // Update localStorage
    const dateKey =
      selectedDate?.toLocaleDateString() || new Date().toLocaleDateString();
    const savedData = localStorage.getItem(dateKey);
    if (savedData) {
      const { activities } = JSON.parse(savedData);
      const newData = { meals: updatedMeals, activities };
      localStorage.setItem(dateKey, JSON.stringify(newData));
    }

    // Recalculate and update the state
    updateCaloriesAndProtein(updatedMeals, activities);
  };

  const handleDeleteActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);

    // Update localStorage
    const dateKey =
      selectedDate?.toLocaleDateString() || new Date().toLocaleDateString();
    const savedData = localStorage.getItem(dateKey);
    if (savedData) {
      const { meals } = JSON.parse(savedData);
      const newData = { meals, activities: updatedActivities };
      localStorage.setItem(dateKey, JSON.stringify(newData));
    }

    // Recalculate and update the state
    updateCaloriesAndProtein(meals, updatedActivities);
  };

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
      <p className="Date">{selectedDate.toLocaleDateString()}</p>
      <h1 className="JournalMeals">Today's Meals</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Calories (kcal)</th>
            <th>Protein (grams)</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, index) => (
            <tr key={index}>
              <td style={{ position: "relative" }}>
                {meal.mealName}
                <button
                  onClick={() => handleDeleteMeal(index)}
                  style={{
                    position: "absolute",
                    left: "-35px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    paddingLeft: "8px",
                    paddingRight: "9px",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    fontSize: "1rem",
                  }}
                >
                  X
                </button>
              </td>
              <td>{meal.mealCalories}</td>
              <td>{meal.mealProtein}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                id="mealName"
                name="mealName"
                placeholder="Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
            <td>
              <input
                type="text"
                id="mealCalories"
                name="mealCalories"
                placeholder="Calories"
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
            <td>
              <input
                type="text"
                id="mealProtein"
                name="mealProtein"
                placeholder="Protein"
                value={mealProtein}
                onChange={(e) => setMealProtein(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <h1 className="JournalActivities">Today's Activities</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Burnt Calories (kcal)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td style={{ position: "relative" }}>
                {activity.activityName}
                <button
                  onClick={() => handleDeleteActivity(index)}
                  style={{
                    position: "absolute",
                    left: "-35px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    paddingLeft: "8px",
                    paddingRight: "9px",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    fontSize: "1rem",
                  }}
                >
                  X
                </button>
              </td>
              <td>{activity.activityBurntCalories}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                id="activityName"
                name="activityName"
                placeholder="Activity Name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                onKeyDown={handleKeyPressActivity}
              />
            </td>
            <td>
              <input
                type="text"
                id="activityBurntCalories"
                name="activityBurntCalories"
                placeholder="Burnt Calorie Count"
                value={activityBurntCalories}
                onChange={(e) => setActivityBurntCalories(e.target.value)}
                onKeyDown={handleKeyPressActivity}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Journal;
