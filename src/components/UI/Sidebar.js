import React from 'react'
import {  NavLink } from 'react-router-dom'
import classes from './Sidebar.module.css'

export const Sidebar = (props) => {
    console.log(props.np); 
    return (
      
        <div className={`${classes.sidebar} ${props.className}`}>
            <div className={`d-flex flex-column`}>
            {
           props.np.map((item)=>{

                 return(
                    <NavLink to={item.path} className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                    {item.name}
                </NavLink>  
                 )
            })
        }
            </div>
        </div>
    )
}

/*
  <NavLink to="NewAssistant" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                    
                     {props}
                </NavLink>
                <NavLink to="Complaints" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                    شكاوي
                </NavLink>
                <NavLink to="DoctorsSearchName" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                  البحث عن اطباء عن طريق الأسم 
                </NavLink>
                <NavLink to="DoctorSearchIdSyr" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                    البحث عن طبيب عن طريق الرقم الوطني
                </NavLink>
                <NavLink to="MedicalTips" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
            
                    النصائح الطبية
                </NavLink>
                <NavLink to="Reports" className={({ isActive }) =>
                    isActive ? `${classes.active} ${classes.nav}` : classes.nav
                }>
                    التقارير
                </NavLink>
               


*/