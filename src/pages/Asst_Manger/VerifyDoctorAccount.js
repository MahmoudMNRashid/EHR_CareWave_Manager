import React from 'react'
import { VerifyDoctorAccountCard } from '../../components/Asst_Manger/VerifyDoctorAccountCard'
import classes from '../../components/Asst_Manger/VerifyDoctorAccountCard.module.css'
export const VerifyDoctorAccount = () => {
  return (
    <div className={classes.grid}>
   <VerifyDoctorAccountCard/>
   <VerifyDoctorAccountCard/>
   <VerifyDoctorAccountCard/>
   <VerifyDoctorAccountCard/>

   </div>
  )
}
