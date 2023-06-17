import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForConfrmDeleteTips.module.css'


const Backdrop = (props) => {
    return <div onClick={() => { props.close() }} className={classes.backdrop} />;
};
const CDT = (props) => {
    
    return (
        <div className={classes.modal}>
            <div className={classes.first}>
                <span className={classes.heading}> هل انت متاكد من حذف النصيحة  </span>
            </div>


            <div className={classes.third}>

                <button
                    className={classes.btn}
                     onClick={() => {
                        props.onDelete(props.id)
                        props.close()
                    }}>تأكيد </button>
                <button onClick={() => {
                    props.close()
                }} className={classes.btn}>إغلاق </button>

            </div>
        </div>

    );
};

export const ModalForConfirmDeleteTips = (props) => {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))}
            {ReactDOM.createPortal(<CDT id={props.id}  onDelete={props.onDelete} close={props.close} />, document.getElementById('modal'))}
        </React.Fragment>
    );

};




