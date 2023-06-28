import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForDeleteDoctorAccount.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { getToken } from '../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar';


const DeleteAccount= (props)=>{
  const [isLoading, setIsLoading] = useState(false);
  const formSubmissionHandler = async (event) => {
    setIsLoading(true);
    if (!props.idSyr) {
      return;
    }
    const info = {
      idSyr: props.idSyr,
    
    }
    console.log(info)
    try {
      const response = await fetch('http://localhost:8000/v1/User/register/Doctor', {
        method: 'Delete',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`

        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      toast.success('تم الحذف بنجاح', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
      props.close()

    } catch (error) {
      
      if (error.message === 'Id is not found') {
        toast.warn('الرقم الوطني غير موجود', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error('!حدث خطأ ما', {
          position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      props.close()
    }
    setIsLoading(false);
  }



  return(
    <div className={classes.container}>
       
       <div>
        <p className={classes.ps}> هل أنت متأكد من  حذف الحساب </p>
       </div>
       <div className={classes.buttons}>
       <button onClick={formSubmissionHandler} ><FontAwesomeIcon style={{color:'#ff1111  '}} icon={faTrashCan}/></button>
       <button onClick={props.close}><FontAwesomeIcon style={{color:'lightslategray  '}} icon={faXmark}/></button>
       </div>
       {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
    </div>
  )

}


export const ModalForDeleteDoctorAccount = (props) => {
console.log(props)
    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))} */}
            {ReactDOM.createPortal(<DeleteAccount idSyr={props.idSyr}  close={props.close}/>, document.getElementById('modal'))}
        </React.Fragment>
    );

};
