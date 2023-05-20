import React from 'react'
import { DoctorSearchInput } from '../../components/Manager/DoctorSearchInput'
import { DetailsDoctor } from '../../components/Manager/DetailsDoctor'
import s from '../../components/Manager/DetailsDoctor.module.css'
export const DoctorsSearchName = () => {
  return (
    <>
      <DoctorSearchInput name={'ادخل اسم الطبيب'} />
      <div className={s.grid}>
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      <DetailsDoctor />
      </div>
    </>
  )
}
