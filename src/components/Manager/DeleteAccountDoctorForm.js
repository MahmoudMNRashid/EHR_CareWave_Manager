import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './DeleteAccountDoctorForm.module.css'
export const DeleteAccountDoctorForm = (props) => {

  const h = (e)=>{
    e.preventDefault()
    props.onClick()

  }
  return (
    <form className={classes.form_}>
    <Form.Group className="mb-3" controlId="formBasicText">
      <Form.Label className={classes.label_}> الرقم الوطني</Form.Label>
      <Form.Control  className={classes.input_} type="text" placeholder="ادخل الرقم الوطني"  />      
    </Form.Group>

    <button variant="primary"  className={classes.button} onClick={h}  >
     تغيير
    </button>

  </form>
  )
}
