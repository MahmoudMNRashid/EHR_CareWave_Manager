import React, { useEffect, useState } from 'react'
import { VerifyDoctorAccountCard } from '../../components/Asst_Manger/VerifyDoctorAccountCard'
import classes from '../../components/Asst_Manger/VerifyDoctorAccountCard.module.css'
import { getToken } from '../../Util/Auth'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
export const VerifyDoctorAccount = () => {
  const doctors = useLoaderData()
  console.log(doctors)
  const [doctor, setdoctor] = useState(doctors)
  console.log(doctors)
  useEffect(() => {
  setdoctor(doctors)
  
    
  }, [doctors])
 const nav= useNavigate()
 console.log(doctor)
  const handleVerifyDoctor= async(id)=>{
try {

  const response  = await fetch('http://localhost:8000/v1/User/register/Doctor/confirmDoctor', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`
    }
  })
  if(!response.ok){
    const data = await response.json()
    throw data
  }
  toast.success('تم  تأكيد الحساب   ', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  });
  nav('/dashboardAsst/VerifyDoctorAccount')


  
} catch (error) {
  console.log(error)
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
}

  }
  return (
    <>
    <div className={classes.grid}>
    

      {
        doctor ? (doctor.map((item) => {
          return (
            <VerifyDoctorAccountCard key={item.id} data={item} api={handleVerifyDoctor} />
          )

        })) : <h4> لا يوجد حسابات لتأكيدها</h4>
      }

    </div>
    <ToastContainer />
    </>
  )
}

export const getVerifyDoctorAccount = async () => {
  console.log('wow')
  const response = await fetch('http://localhost:8000/v1/User/register/Doctor/notConfirm/1', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`


    },
  })

  if (!response.ok) {
console.log('not ok')
    return null;
  }
  const data = await response.json()

  return data.data.doctors

}