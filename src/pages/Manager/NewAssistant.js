import React from 'react'
import classes from './NewAssistant.module.css'


export const NewAssistant = () => {
  return (
    <form className={classes.form}>
  <span className={classes.title}>مساعد مدير النظام</span>
  <p className="classes.description"> تعريف مساعد مدير النظامNostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
  <div>
    <input placeholder="ادخل الأسم" type="email" name="email" id="email-address"/>
    <button type="submit">إضافة</button>
  </div>
</form>
  )
}
