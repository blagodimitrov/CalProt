import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

type JournalProps = {
  selectedDate: Date | null;
  setCalories: (calories: number) => void;
  setProtein: (protein: number) => void;
  setActivity: (activity: number) => void;
  calorieGoal: number;
};

function Journal({
  selectedDate,
  setCalories,
  setProtein,
  setActivity,
}: JournalProps) {
  const [meals, setMeals] = useState<
    { mealName: string; mealCalories: string; mealProtein: string }[]
  >([]);
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [mealProtein, setMealProtein] = useState("");
  const [activityName, setActivityName] = useState("Placeholder Activity");
  const [activityBurntCalories, setActivityBurntCalories] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMeal = {
        mealName,
        mealCalories,
        mealProtein,
      };

      setMeals([...meals, newMeal]);

      setMealName("");
      setMealCalories("");
      setMealProtein("");
    }
  };

  useEffect(() => {
    // Calculate the total calories
    const totalCalories = meals.reduce(
      (acc, meal) => acc + parseFloat(meal.mealCalories || "0"),
      0
    );

    const totalProtein = meals.reduce(
      (acc, meal) => acc + parseFloat(meal.mealProtein || "0"),
      0
    );

    // Update the setCalories prop
    setCalories(totalCalories);
    setProtein(totalProtein);
  }, [meals, setCalories, setProtein]);

  return (
    <>
      <p className="Date">{selectedDate?.toLocaleDateString()}</p>
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
              <td>{meal.mealName}</td>
              <td>{meal.mealCalories}</td>
              <td>{meal.mealProtein}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Calories"
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Protein"
                value={mealProtein}
                onChange={(e) => setMealProtein(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <h1 className="JournalMeals">Today's Activity</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Burnt Calories (kcal)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{activityName}</td>
            <td>{activityBurntCalories}</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Activity Name"
              />
            </td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Burnt Calorie Count"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Journal;
