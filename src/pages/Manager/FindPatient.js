import React from 'react'

import classes from '../Login_Logout/LoginPage.module.css'

import { Helmet } from 'react-helmet'
import { FindPatientForm } from '../../components/Manager/EHR/FindPatient/FindPatientForm'

export const FindPatient = () => {
    return (
        <div className={`${classes.w_h} ${classes.center}`}>
            <Helmet>
                <title>البحث عن مريض</title>

            </Helmet>
            <FindPatientForm />
        </div>




    )
}
