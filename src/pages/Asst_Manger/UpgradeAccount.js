import React from 'react'
import { UpgradeAccountForm } from '../../components/Asst_Manger/UpgardeAccount_Function/UpgradeAccountForm'
import { Helmet } from 'react-helmet'

export const UpgradeAccount = () => {
  return (
   <>
               <Helmet><title>ترقية حساب</title></Helmet>

    <UpgradeAccountForm/>
   </>
    
    
  )
}
