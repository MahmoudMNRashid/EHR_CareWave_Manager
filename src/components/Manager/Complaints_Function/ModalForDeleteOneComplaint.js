import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForDeleteOneComplaint.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';


const DeleteComplaint= (props)=>{
    
  return(
    <div className={classes.container}>
       
       <div>
        <p className={classes.ps}> هل أنت متأكد من حذف الشكوى</p>
       </div>
       <div className={classes.buttons}>
       <button onClick={()=>{props.api()}} ><FontAwesomeIcon style={{color:'lightslategray  '}} icon={faCheck}/></button>
       <button onClick={()=>{props.close()}}><FontAwesomeIcon style={{color:'lightslategray  '}} icon={faXmark}/></button>
       </div>
    </div>
  )

}


export const ModalForDeleteOneComplaint = (props) => {
console.log(props)
    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))} */}
            {ReactDOM.createPortal(<DeleteComplaint api={props.api}  close={props.close}/>, document.getElementById('modal'))}
        </React.Fragment>
    );

};