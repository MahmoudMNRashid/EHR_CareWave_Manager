import React from 'react'
import classes from './AddTipForm.module.css'
export const AddTipForm = () => {
  return (
    <form className={classes.form}>
    
    <input type="text" placeholder="العنوان" className={classes.input}/>
    <textarea placeholder="النصيحة"></textarea>
     
    <button>إضافة</button>
</form>
  )
}
