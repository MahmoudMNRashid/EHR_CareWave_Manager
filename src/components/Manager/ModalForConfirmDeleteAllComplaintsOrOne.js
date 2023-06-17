import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForConfrmDeleteTips.module.css'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../Util/Auth';


const Backdrop = (props) => {
    return <div onClick={() => { props.close() }} className={classes.backdrop} />;
};
const CDC = (props) => {
    const nav = useNavigate()
    const handleDeleteAllOrOne = async () => {
        if (props.data.all === '0') {
         try {
            const response = await fetch(
                'http://localhost:8000/v1/Complaint/deleteComplaint', {
                method: 'DELETE',
                body: JSON.stringify({ id: props.data.id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`
                }
            }
            )
            if (!response.ok) {
                throw new Error();
              }
              toast.success('تم الحذف بنجاح', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
              });
              nav('/dashboardSysAdmin/Complaints')  
            
         } catch (error) {
            toast.error('!حدث خطأ ما', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              nav('/dashboardSysAdmin/Complaints')
         } 

          }
         else { 
            try {
                const response = await fetch(
                    'http://localhost:8000/v1/Complaint/deleteAllComplaint', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()}`
                    }
                }
                )
                if (!response.ok) {
                    throw new Error();
                  }
                  toast.success('تم الحذف بنجاح', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                  });
                  nav('/dashboardSysAdmin/Complaints')  
                
             } catch (error) {
                toast.error('!حدث خطأ ما', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  nav('/dashboardSysAdmin/Complaints')
             } 
    
          
        }
    }
    return (
        <div className={classes.modal}>
            <div className={classes.first}>
                <span className={classes.heading}> {props.data.all === "0" ? 'هل انت متاكد من حذف الشكوى' : 'هل انت متاكد من حذف كل الشكاوي'} </span>
            </div>


            <div className={classes.third}>

                <button
                    className={classes.btn}
                    onClick={handleDeleteAllOrOne}>تأكيد </button>
                <button onClick={() => {
                    nav('/dashboardSysAdmin/Complaints')
                }} className={classes.btn}>إغلاق </button>

            </div>
        </div>

    );
};

export const ModalForConfirmDeleteAllComplaintsOrOne = (props) => {
    const { data } = useParams();
    const a = JSON.parse(data);
    console.log(a)
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop />, document.getElementById('modal'))}
            {ReactDOM.createPortal(<CDC data={a} />, document.getElementById('modal'))}
        </React.Fragment>
    );

};

// id={props.id}  onDelete={props.onDelete}


