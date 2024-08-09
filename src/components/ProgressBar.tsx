import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress() {
  
  const calorieGoal = 2600;
  const calorieCurrent = 150;
  const proteinGoal = 120;
  const proteinCurrent = 10;
  const calorieNow = Math.round(calorieCurrent/calorieGoal*100);
  const proteinNow = Math.round(proteinCurrent/proteinGoal*100);
  
  return (<div className='TrackerContainer'>
    <div className='TrackerSegment'><p>Calories {calorieCurrent}/{calorieGoal} kcal</p><ProgressBar variant="warning" now={calorieNow} /></div>
    <div className='TrackerSegment'><p>Protein {proteinCurrent}/{proteinGoal} grams</p><ProgressBar variant="danger" now={proteinNow} /></div>
    </div>
  )
}

export default Progress;