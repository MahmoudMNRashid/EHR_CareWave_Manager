import React from 'react'
import { DeleteAccountDoctorForm } from '../../components/Manager/DeleteAccountDoctor/DeleteAccountDoctorForm'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

export const DeleteAccountDoctor = () => {




  return (

    <>
            <Helmet><title>   حذف حساب طبيب</title></Helmet>

      <DeleteAccountDoctorForm />
     
   <ToastContainer/>
    </>
  )
}
