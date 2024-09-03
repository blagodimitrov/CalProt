type FatLossProps = {
  calories: number;
  calorieGoal: number;
};

function FatLoss({ calories, calorieGoal }: FatLossProps) {
  const fatLossCalculation = (calories: number, calorieGoal: number) => {
    // Ensure there are valid values for calculation
    if (calories === 0 || calorieGoal === 0) return 0; // Avoid division by zero

    const totalCalories = calories - calorieGoal;
    if (totalCalories <= 0) return 0; // No fat loss if calories are not exceeding the goal

    return Math.round((-totalCalories / 7700) * 100) / 100;
  };

  return (
    <>
      <div>Total Fat Loss</div>
      <div className="FatLoss">
        {fatLossCalculation(calories, calorieGoal)} kg
      </div>
      <div></div>
    </>
  );
}

export default FatLoss;
