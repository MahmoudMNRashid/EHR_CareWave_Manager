import React from 'react'
import classes from './ComplaintsCard.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
export const ComplaintsCard = (props) => {
const nav= useNavigate()


const ify= {...props.data,"all":"0"}
  const handleButtonClick = () => {
    nav(`/dashboardSysAdmin/Complaints/DeleteComplaint's'/${encodeURIComponent(JSON.stringify(ify))}`);
  };

  const dateString = props.data.date;
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(4, '0');
  const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });

  

  return (
    <div className={classes.card}>
      <div className={classes.datetimecontainer}>
        <time className={classes.datetime} >
          <span>{year}</span>
          <span className={classes.separator}></span>
          <span>{formattedDate}</span>
        </time>
      </div>
      <div className={classes.content}>

        <div className={classes.infos}>


          <NavLink to='/'>
            <span className={classes.title}>
              {`المشتكى عليه : د ${props.data.namedoctor}`}
            </span>
          </NavLink>

          <p className={classes.description}>
            {props.data.complainText}
          </p>
        </div>

        <button onClick={handleButtonClick} className={classes.action}> حذف الشكوى</button>
      </div>
    </div>
  )
}
