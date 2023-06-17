import React, { useState } from 'react'
import { DoctorSearchInput } from '../../components/Manager/DoctorSearchInput'
import { DetailsDoctor } from '../../components/Manager/DetailsDoctor'
import { ToastContainer, toast } from 'react-toastify'
import { getToken } from '../../Util/Auth'

export const DoctorSearchIdSyr = () => {
  const [doctorsName, setDoctorsName] = useState([])
 

  const fetchAllDoctorByIdSyr = async (idSyr) => {

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
    
     const editData =data.data.result
     
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
      <DoctorSearchInput api={fetchAllDoctorByIdSyr} name={'ادخل الرقم الوطني للطبيب'} />
     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
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
