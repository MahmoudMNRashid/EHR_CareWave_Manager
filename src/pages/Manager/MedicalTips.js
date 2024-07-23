import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../Util/Auth';

import { TipCard } from '../../components/Manager/Tips_Function/TipCard';
import { ButtonAdd } from '../../components/Manager/Tips_Function/ButtonAdd';
import { ModalForUpdateOrAddTip } from '../../components/Manager/Tips_Function/ModalForUpdateOrAddTip';
import nothing from '../../style/nothing (1).png'
import { Bars } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
export const MedicalTips = () => {
 

  const [ModalUpdateOrAddTipIsOpen, setModalUpdateOrAddTipIsOpen] = useState(false)
  const handleCloseModalUpdateOrAddTip = () => {
    setModalUpdateOrAddTipIsOpen(false)
   
  }
  const handleOpenModalUpdateOrAddTip = () => {
    setModalUpdateOrAddTipIsOpen(true)
  }
  const [tips, setTips] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(true);

const update =()=>{
  setTips([])
  setPage(1)
 fetchAllComplaints()
}



  const fetchAllComplaints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/v1/Tips/getTips/${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('شيء ما حدث');
      }

      const data = await response.json();

      if (data.data.tips.length === 0) {
        setHasData(false);
      } else {
        setTips((prev) => [...prev, ...data.data.tips]);
      }
    } catch (error) {
      toast.error('!حدث خطأ ما', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setIsLoading(false);
    }
  };






  useEffect(() => {
    fetchAllComplaints();
  }, [page]);

  const handleScrollEvent = async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    try {
      if (innerHeight + scrollTop + 1 >= totalHeight) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);


  const handelDeleteTipApi = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/v1/Tips/deleteTips', {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error();
      }

      const editArray = tips.filter(item => item.id !== id
      )
      setTips(editArray)
      toast.success('تم الحذف بنجاح', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });

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
    setIsLoading(false);
  };

  return (
    <>
                <Helmet><title>النصائح الطبية</title></Helmet>

      <div className='divflex'>

        {tips.map((item) => {
          return (
            <TipCard key={item.id} data={item} api={handelDeleteTipApi} refreash={update} />
          )


        })}
      </div>

      {!isLoading && tips.length === 0 && <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد نصائح</h4>
        <img style={{ width: '30px', color: 'black' }} src={nothing} alt='error' />

      </div>}

      {isLoading && tips.length === 0 && (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="loader">
          <Bars height="80" width="80" color="#77ffab " ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={isLoading} />
        </div>
      )}



      <ButtonAdd onClick={handleOpenModalUpdateOrAddTip} />
      <ToastContainer />
      {ModalUpdateOrAddTipIsOpen && <ModalForUpdateOrAddTip edit={false} close={handleCloseModalUpdateOrAddTip} refreash={update} />}
    </>
  )
}

