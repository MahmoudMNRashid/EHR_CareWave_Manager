import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './UpgradeAccountForm.module.css'
export const UpgradeAccountForm = () => {
  return (
    <form className={classes.form_}>
    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}>الأسم</Form.Label>
      <Form.Control  className={classes.input_} type="text" placeholder="ادخل الاسم"  />
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}>الرقم الوطني</Form.Label>
      <Form.Control className={classes.input_} type="text" placeholder="ادخل الرقم الوطني" />
    </Form.Group>

    <Form.Group className="mt-12 mb-6" controlId="formBasicText">
    
    <Form.Select className={classes.select} aria-label="Default select example">
      <option className={classes.option} >اختر الفئة  الطبية </option>
      <option className={classes.option} value="1">طبيب</option>  
      <option className={classes.option} value="2">صيدلي</option>  
      <option className={classes.option} value="3">مخبري</option>
      <option className={classes.option} value="4">مصور أشعة</option>
      <option className={classes.option} value="5">ممرض</option>
    </Form.Select>
    </Form.Group> 


    <button variant="primary" type="submit" className={classes.button}  >
      تطوير
    </button>
    
  </form>
  )
}
