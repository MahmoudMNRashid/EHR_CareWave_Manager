import React from 'react'
import { ChangePaswordForm } from '../../components/Asst_Manger/ChangePassword_Function/ChangePasswordForm'
import { Helmet } from 'react-helmet'

export const ChangePassword = () => {
  return (
    <>
      <Helmet><title> تغيير كلمة مرور فئة طبية</title></Helmet>

      <ChangePaswordForm />
    </>
  )
}
