import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './ChangeNumberForm.module.css'
export const ChangeNumberForm = () => {
  return (
    <form className={classes.form_}>
    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}> الرقم الوطني</Form.Label>
      <Form.Control  className={classes.input_} type="text" placeholder="ادخل الرقم الوطني"  />
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}>الرقم الجديد</Form.Label>
      <Form.Control className={classes.input_} type="text" placeholder="ادخل الرقم الجديد" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}>كلمة المرور</Form.Label>
      <Form.Control className={classes.input_} type="password" placeholder="ادخل كلمة المرور" />
    </Form.Group>

 


    <button variant="primary" type="submit" className={classes.button}  >
     تغيير
    </button>
    
  </form>
  )
}
