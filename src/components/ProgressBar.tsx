import ProgressBar from "react-bootstrap/ProgressBar";

type ProgressBarProps = {
  calories: number;
  protein: number;
  calorieGoal: number;
  proteinGoal: number;
};

function Progress({
  calories,
  protein,
  calorieGoal,
  proteinGoal,
}: ProgressBarProps) {
  return (
    <div className="TrackerContainer">
      <div className="TrackerSegment">
        <p>
          Calories {calories}/{calorieGoal} kcal
        </p>
        <ProgressBar
          variant="warning"
          now={Math.round((calories / calorieGoal) * 100)}
        />
      </div>
      <div className="TrackerSegment">
        <p>
          Protein {protein}/{proteinGoal} grams
        </p>
        <ProgressBar
          variant="danger"
          now={Math.round((protein / proteinGoal) * 100)}
        />
      </div>
    </div>
  );
}

export default Progress;
