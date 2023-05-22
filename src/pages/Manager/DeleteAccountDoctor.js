import React, { useState } from 'react'
import { DeleteAccountDoctorForm } from '../../components/Manager/DeleteAccountDoctorForm'
import { Modal } from '../../components/UI/modal'

export const DeleteAccountDoctor = () => {
  const [ShowModel,setShowModel] = useState(false)
  const ShowModall = ()=>{
    console.log('ss')
    setShowModel(true)
  }
  return (
   
    <>
    <DeleteAccountDoctorForm onClick={ShowModall}/>
     { ShowModel && <Modal/>}
    </>
  )
}
