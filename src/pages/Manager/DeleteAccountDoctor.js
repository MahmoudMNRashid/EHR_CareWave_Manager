import React, { useState } from 'react'
import { DeleteAccountDoctorForm } from '../../components/Manager/DeleteAccountDoctorForm'
import { Modal } from '../../components/UI/modal'
import { getToken } from '../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'

export const DeleteAccountDoctor = () => {
  const [ShowModel, setShowModel] = useState(false)
  const [idSyr, setidSyr] = useState()
  console.log(idSyr)
  const a = (idsyr) => {
    setidSyr(idsyr)
  }
  const handleCloseModal = () => {
    setShowModel(false)
  }
  const ShowModall = () => {

    setShowModel(true)
  }

  const formSubmissionHandler = async (event) => {
    if (!idSyr) {
      return;
    }
    const info = {
      idSyr: idSyr,
    
    }
    try {
      const response = await fetch('http://localhost:8000/v1/User/register/Doctor', {
        method: 'Delete',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`

        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      toast.success('تم الحذف بنجاح', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
      handleCloseModal()

    } catch (error) {
      
      if (error.message === 'Id is not found') {
        toast.warn('الرقم الوطني غير موجود', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      handleCloseModal()
    }
  }
  return (

    <>
      <DeleteAccountDoctorForm onClick={ShowModall} a={a} />
      {ShowModel && <Modal close={handleCloseModal} api={formSubmissionHandler} />}
   <ToastContainer/>
    </>
  )
}
