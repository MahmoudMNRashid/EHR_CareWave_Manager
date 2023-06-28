import React from 'react'
import classes from './DoctorCard.module.css'
import date from '../../../style/DoctorCard/date-of-birth.png'
import doctor1 from '../../../style/DoctorCard/doctor (1).png'
import doctor from '../../../style/DoctorCard/doctor.png'
import id1 from '../../../style/DoctorCard/id-card (1).png'
import id2 from '../../../style/DoctorCard/id-card (2).png'
import location from '../../../style/DoctorCard/location.png'
import staff from '../../../style/DoctorCard/medical-staff.png'
import state from '../../../style/DoctorCard/real-state.png'
import stethscope from '../../../style/DoctorCard/stethoscope.png'
import iphone from '../../../style/DoctorCard/iphone.png'
export const DoctorCard = (props) => {
    return (
        <div className={classes.container}>

            <div className={classes.right}>
                <h4>معلومات الطبيب </h4>
                <div className={classes.containerinfo}>
                    <div className={classes.info}>
                        <img src={id1} alt='error' />
                        <p>  {props.data.name} </p>
                    </div>
                    <div className={classes.info}>
                        <img src={date} alt='error' />
                        <p> 2000-2-23</p>
                    </div>
                    <div className={classes.info}>
                        <img src={id2} alt='error' />
                        <p>{props.data.syrid}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={iphone} alt='error' />
                        <p>{props.data.phone}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={state} alt='error' />
                        <p> {props.data.governorate}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={location} alt='error' />
                        <p>{props.data.address}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={stethscope} alt='error' />
                        <p>{props.data.specialization}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={staff} alt='error' />
                        <p>{props.data.medicalid}</p>
                    </div>


                </div>
            </div>



            <div className={classes.left}>

                
                {props.data.gender==='male'?<img src={doctor} alt='error' />:<img src={doctor1} alt='error' />}
            </div>












        </div>
    )
}
