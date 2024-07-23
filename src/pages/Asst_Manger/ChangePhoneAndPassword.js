import React from 'react'
import { ChangePasswordPhone } from '../../components/Asst_Manger/ChangePasswordPhone_Function/ChangePasswordPhone'
import { Helmet } from 'react-helmet'

export const ChangePhoneAndPassword = () => {
  return (
    <>
                <Helmet><title>تغيير كلمة المرور ورقم الهاتف لفئة طبية</title></Helmet>

   <ChangePasswordPhone/>
    </>
  )
}
