import Table from 'react-bootstrap/Table';

function FatLoss () {
    return(
        <> <h1 className='JournalMeals'>Today's Meals</h1>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Meal</th>
          <th>Calories (kcal)</th>
          <th>Protein (grams)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sausage with Egg</td>
          <td>650</td>
          <td>23</td>
        </tr>
        <tr>
          <td><input type="text" id="fname" name="fname" placeholder="Meal Name" /></td>
          <td><input type="text" id="fname" name="fname" placeholder="Calorie Count"/></td>
          <td><input type="text" id="fname" name="fname" placeholder="Protein Count"/></td>
        </tr>
      </tbody>
    </Table>

    <h1 className='JournalMeals'>Today's Activity</h1>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Activity</th>
          <th>Burnt Calories (kcal)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gym 40 Min</td>
          <td>350</td>
        </tr>
        <tr>
          <td><input type="text" id="fname" name="fname" placeholder="Activity Name" /></td>
          <td><input type="text" id="fname" name="fname" placeholder="Burnt Calorie Count"/></td>
        </tr>
      </tbody>
    </Table>
        
        </>
        
    );
}

export default FatLoss;