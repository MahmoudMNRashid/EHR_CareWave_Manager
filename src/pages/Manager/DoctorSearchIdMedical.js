import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { DrSearchForm } from '../../components/Manager/AllAboutDr_Function/DrSearchForm'
import { getToken } from '../../Util/Auth'
import { DoctorCard } from '../../components/Manager/AllAboutDr_Function/DoctorCard'
import nothing from '../../style/nothing (1).png'
import { Helmet } from 'react-helmet'

export const DoctorSearchIdMedical = () => {
  const [doctorsName, setDoctorsName] = useState([])

  const fetchTheDoctorByIdMedical = async (idMedical) => {

    try {
      const response = await fetch(`http://localhost:8000/v1/User/get-Sick/bysyrid/${idMedical}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`


        },
      })
      if (!response.ok) {

        throw new Error('شيء ما حدث')
      }
      const data = await response.json()

      const editData = data.data.result

      if (data.data.result.length === 0) {
        toast.warning('الرقم الوطني غير موجود ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      setDoctorsName(editData)


    } catch (error) {
      toast.error('!حدث خطأ ما', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }


  }
  return (
    <>
            <Helmet><title> البحث عن طبيب عن طريق الرقم الطبي  </title></Helmet>

      <DrSearchForm fromIdSyr={true} api={fetchTheDoctorByIdMedical} name={' الرقم الطبي للطبيب'} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          doctorsName.length > 0 ? (
            doctorsName.map((item) => {
              return <DoctorCard key={item.id} data={item} />;
            })
          ) : (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
              <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد نتائج</h4>
              <img style={{ width: '30px', color: 'black' }} src={nothing} alt='error' />

            </div>
          )
        }
      </div>
      
      <ToastContainer />

    </>
  )
}
