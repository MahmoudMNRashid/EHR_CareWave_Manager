import React from 'react'
import { TipsCard } from '../../components/Manager/TipsCard'
import { Button } from '../../components/UI/Button'
import { ToastContainer, toast } from 'react-toastify';
import s from '../../components/Manager/TipsCard.module.css'
import { getToken } from '../../Util/Auth';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const MedicalTips = () => {
  const tips = useLoaderData();
const nav = useNavigate

  console.log('this')

  const handleDeleteTip = async (tipId) => {
    try {
      const response = await fetch('http://localhost:8000/v1/Tips/deleteTips', {
        method: 'DELETE',
        body: JSON.stringify({ id: tipId }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error();
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
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      


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
    }
  };
  const svg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
  return (
    <>
      <div className={s.grid}>

        {tips.map((item) => {
          return (
            <TipsCard key={item.id} data={item} onDelete={handleDeleteTip} />
          )

        })}
      </div>
      <Button onClick={()=>{
            nav('AddTips')
        }} title='إضافة' icon={svg} />
      <ToastContainer />
    </>
  )
}

export const fetchAllTips = async () => {

  const response = await fetch('http://localhost:8000/v1/Tips/getTips/1', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`


    },
  })

  if (!response.ok) {

    return null;
  }
  const data = await response.json()

  return data.data.tips

}
