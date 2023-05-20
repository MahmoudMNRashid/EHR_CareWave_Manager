import React from 'react'
import { DoctorSearchInput } from '../../components/Manager/DoctorSearchInput'
import { DetailsDoctor } from '../../components/Manager/DetailsDoctor'

export const DoctorSearchIdSyr = () => {
  return (
    <>
      <DoctorSearchInput name={'ادخل الرقم الوطني للطبيب'} />
     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}> <DetailsDoctor /> </div>
    </>
  )
}
