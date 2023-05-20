import React from 'react'
import classes from './DoctorSearchInput.module.css'
export const DoctorSearchInput = (props) => {
  return (
    <div className={classes['input-group']}>
    <input type="email" className={classes['input']} id="Email" name="Email" placeholder={props.name} />
    <input className={classes['button--submit']} value="ابحث" type="submit"/>
</div>

  )
}
