import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForAddNewAssistant.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import lock from '../../../style/lock.png'

const AddNewAsst= (props)=>{
    
  return(
    <div className={classes.container}>
       <div>
        <button onClick={()=>{props.close()}}><FontAwesomeIcon style={{color:'d6d6d6  '}} icon={faXmark}/></button>
       </div>
       <div>
        <p className={classes.ps}> يرجى حفظ كلمة المرور الخاصة بك بشكل آمن. لأسباب أمانية، لن تظهر كلمة المرور مرة أخرى.</p>
       </div>
       <div className={classes.pass}>
        <img style={{width:'1.2rem'}} src={lock} alt='errro'></img>
        <p className={classes.password}> {props.password}</p>
       </div>
    </div>
  )

}


export const ModalForAddNewAssistant = (props) => {
console.log(props)
    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))} */}
            {ReactDOM.createPortal(<AddNewAsst password={props.password} close={props.close}/>, document.getElementById('modal'))}
        </React.Fragment>
    );

};
