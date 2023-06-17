import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForAddNewAsst.module.css'




const Backdrop = (props) => {
    return <div onClick={() => { props.close() }} className={classes.backdrop} />;
};
const AnA = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.first}>
                <span className={classes.heading}> هام:  الرجاء حفظ كلمة المرور بسبب عند إغلاق الواجهة لن تظهر مرة اخرى  </span>
            </div>

            <div className={classes.second}>
               <div>
               <div>
                <span>الأسم:</span>
                <p>{props.data.name}</p>
               </div>
    
               <div>
                <span>كلمة المرور:</span>
                <p>{props.data.password}</p>
               </div>
               </div>
            </div>
            <div className={classes.third}>
              
                <button onClick={() => {
                    props.close()
                }} className={classes.btn}>إغلاق </button>

            </div>
        </div>

    );
};

export const ModalForAddNewAsst = (props) => {
    console.log(props.data)
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))}
            {ReactDOM.createPortal(<AnA data={props.data} close={props.close} />, document.getElementById('modal'))}
        </React.Fragment>
    );

};




