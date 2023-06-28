import React from 'react'
import classes from './PatientCard.module.css'
import date from '../../../style/DoctorCard/date-of-birth.png'

import patient from '../../../style/Patient/5862572_avatar_man_mask_patient_virus_icon.png'
import id1 from '../../../style/DoctorCard/id-card (1).png'
import id2 from '../../../style/DoctorCard/id-card (2).png'
import location from '../../../style/DoctorCard/location.png'
import state from '../../../style/DoctorCard/real-state.png'
import iphone from '../../../style/DoctorCard/iphone.png'
export const PatientCard = (props) => {
    return (
        <div className={classes.container}>

            <div className={classes.right}>
                <h4>معلومات المريض </h4>
                <div className={classes.containerinfo}>
                    <div className={classes.info}>
                        <img src={id1} alt='error' />
                        <p>  {props.data.name} </p>
                    </div>
                    <div className={classes.info}>
                        <img src={date} alt='error' />
                        <p>2000-2-23</p>
                    </div>
                    <div className={classes.info}>
                        <img src={id2} alt='error' />
                        <p>03280052717</p>
                    </div>
                    <div className={classes.info}>
                        <img src={iphone} alt='error' />
                        <p>0968955789</p>
                    </div>
                    <div className={classes.info}>
                        <img src={state} alt='error' />
                        <p> {props.data.governorate}</p>
                    </div>
                    <div className={classes.info}>
                        <img src={location} alt='error' />
                        <p>يبرود حي القاعة</p>
                    </div>

                </div>
            </div>



            <div className={classes.left}>

                <img src={patient} alt='error' />
            </div>












        </div>
    )
}
