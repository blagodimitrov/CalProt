type FatLossProps = {
  calories: number;
  calorieGoal: number;
};

function FatLoss({ calories, calorieGoal }: FatLossProps) {
  const date = new Date();
  const currentMonth = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {" "}
      <div>{monthNames[currentMonth]} Fat Loss</div>
      <div className="FatLoss">
        -{Math.round((-(calories - calorieGoal) / 7700) * 100) / 100}kg
      </div>
      <div>Total Fat Loss</div>
      <div className="FatLoss">
        -{Math.round((-(calories - calorieGoal) / 7700) * 100) / 100}kg
      </div>{" "}
    </>
  );
}

export default FatLoss;
