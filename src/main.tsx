import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Progress from './components/ProgressBar.tsx';
import CurrentDate from './components/Date.tsx';
import Calendar from './components/Calendar.tsx';
import FatLoss from './components/FatLoss.tsx';
import Journal from './components/Journal.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='Container'>

    <div className='LeftColumn'>
    <Calendar />
    </div>
    
    <div className='RightColumn'>
    <CurrentDate />
    <Journal />

    <Progress />
    <FatLoss />

    </div>
  
    </div>
    
  </React.StrictMode>,
)
