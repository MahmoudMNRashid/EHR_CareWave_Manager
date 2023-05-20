import React from 'react'
import classes  from './ComplaintsCard.module.css'
import { NavLink } from 'react-router-dom'
export const ComplaintsCard = () => {
  return (
    <div className={classes.card}>
    <div className={classes.datetimecontainer}>
      <time className={classes.datetime} >
        <span>2022</span>
        <span className={classes.separator}></span>
        <span>Oct 10</span>
      </time>
    </div>
    <div className={classes.content}>
    
      <div className={classes.infos}>
        <NavLink to='/'>
          <span className={classes.title}>
           مقدم الشكوى:وسام الخطيب
    
          </span>
        </NavLink>
        <br/>
        <NavLink to='/'>
          <span className={classes.title}>
           المشتكى عليه : د عمر صيبعة
          </span>
        </NavLink>
  
        <p className={classes.description}>
            نص الشكوى
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
          sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
          voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
          Molestias explicabo corporis voluptatem?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
          sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
          voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
          Molestias explicabo corporis voluptatem?
        </p>
      </div>
  
       <button className={classes.action}> حذف الشكوى</button>
    </div>
  </div>
  )
}
