import React, { useState } from 'react'
import { PatientCard } from '../../components/Manager/AllAboutPatient/PatientCard'
import { ToastContainer, toast } from 'react-toastify'
import { getToken } from '../../Util/Auth'
import { DrSearchForm } from '../../components/Manager/AllAboutDr_Function/DrSearchForm'
import nothing from '../../style/nothing (1).png'

export const PatientSearchIdSyr = () => {
  const [Patient, setPatient] = useState([])
  const fetchPatientByIdSyr = async (idSyr) => {

    try {
      const response = await fetch(`http://localhost:8000/v1/User/get-Sick/bysyrid/${idSyr}`, {
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
      setPatient(editData)


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
    <DrSearchForm fromIdSyr={true} api={fetchPatientByIdSyr} name={' الرقم الوطني للمريض'} />

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {
        Patient.length > 0 ? (
          Patient.map((item) => {
            return <PatientCard key={item.id} data={item} />;
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
