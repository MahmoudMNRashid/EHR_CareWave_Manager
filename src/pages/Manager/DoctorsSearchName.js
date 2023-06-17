import React, { useEffect, useState } from 'react'
import { DoctorSearchInput } from '../../components/Manager/DoctorSearchInput'
import { DetailsDoctor } from '../../components/Manager/DetailsDoctor'
import s from '../../components/Manager/DetailsDoctor.module.css'
import { getToken } from '../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
export const DoctorsSearchName = () => {
  const [doctorsName, setDoctorsName] = useState([])
 

  const fetchAllDoctorByName = async (name) => {

    try {
      const response = await fetch(`http://localhost:8000/v1/User/get-doctors/byname/${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`


        },
      })
      if (!response.ok) {

        throw new Error('شيء ما حدث')
      }
      const data = await response.json()
    
     const editData =data.data.result
     for (let i = 0; i < editData.length; i++) {
      editData[i].name = name;
    }
      setDoctorsName(editData)


    } catch (error) {
      toast.error('!حدث خطأ ما', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // return redirect()
    }


  }



  return (
    <>
      <DoctorSearchInput name={'ادخل اسم الطبيب'} api={fetchAllDoctorByName} />
      <div className={s.grid}>

        {
          doctorsName.length > 0 ? (
            doctorsName.map((item) => {
              return <DetailsDoctor key={item.id} data={item} />;
            })
          ) : (
            <h4 style={{ display: 'flex', justifyContent: 'center', color: 'whitesmoke', fontWeight: 600, fontSize: 30 }}>لا يوجد نتائج  </h4>
          )
        }
      
      </div>
      <ToastContainer/>
    </>
  )
}



