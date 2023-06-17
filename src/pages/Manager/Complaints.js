import React from 'react'
import { ComplaintsCard } from '../../components/Manager/ComplaintsCard'
import { Button } from '../../components/UI/Button'
import { getToken } from '../../Util/Auth';
import { ToastContainer, toast } from 'react-toastify';
import { useLoaderData, useNavigate } from 'react-router-dom';


export const Complaints = () => {

  const nav = useNavigate()
  const complaints = useLoaderData();
  
  const ify={ "all":"1"}
  const handleButtonClick = () => {
    nav(`/dashboardSysAdmin/Complaints/DeleteComplaint's'/${encodeURIComponent(JSON.stringify(ify))}`);
  };
  const svg =<svg   fill='rgb(36 41 52)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="50" height="50"><path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"/></svg>;
  return (
    <>
    <div className='divgrid'>
    

  {complaints.map((item)=>{

    return(
      <ComplaintsCard key={item.id} data={item}/>
    )
  })}
    </div>
   
   
   {complaints>0 && <Button onClick={handleButtonClick} style={{fontSize:'10px', fontWeight:'300'}} title='حذف الكل' icon={svg}/>}
    
  <ToastContainer/>
  {complaints.length===0?<h4 style={{ display: 'flex', justifyContent: 'center', color: 'whitesmoke', fontWeight: 600, fontSize: 30 }}>لا يوجد شكاوى</h4>: null}
    </>
  )
}

export const fetchAllComplaints= async()=>{
const response = await fetch('http://localhost:8000/v1/Complaint/getAllComplaint/1',{
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${getToken()}`


}},
)
try {
  if(!response.ok){
    throw new Error('شيئ ما حدث')
    
  }
  const data = await response.json()
console.log(data.data.complaints)
return data.data.complaints
  
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
  return null

}
}
