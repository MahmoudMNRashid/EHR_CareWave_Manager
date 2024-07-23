import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { getToken } from '../../Util/Auth';
import { ToastContainer, toast } from 'react-toastify';

import { ComplaintsCard } from '../../components/Manager/Complaints_Function/ComplaintsCard';
import { ButtonDelete } from '../../components/Manager/Complaints_Function/ButtonDelete';
import { ModalForDeleteAllComplaint } from '../../components/Manager/Complaints_Function/ModalForDeleteAllComplaint';
import nothing from '../../style/nothing (1).png';
import { Helmet } from 'react-helmet';

export const Complaints = () => {

  const [modalDeleteAllComplaintsIsOpen, setModalDeleteAllComplaintsIsOpen] = useState(false);
  const handleCloseModalDeleteAllComplaints = () => {
    setModalDeleteAllComplaintsIsOpen(false);
  };
  const handleOpenModalDeleteAllComplaints = () => {
    setModalDeleteAllComplaintsIsOpen(true);
  };


  
  const handleDeleteAllComplaintsApi = async () => {
    
    try {
      const response = await fetch('http://localhost:8000/v1/Complaint/deleteAllComplaint', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      toast.success('تم الحذف بنجاح', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      
      setcomplaints([]);
      setPage(1);
      handleCloseModalDeleteAllComplaints();
      
     
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
    
      handleCloseModalDeleteAllComplaints();
      
    }
  
 
  };

  const [complaints, setcomplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(true);


  const fetchAllComplaints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/v1/Complaint/getAllComplaint/${page}`, {
       
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('شيء ما حدث');
      }

      const data = await response.json();

      if (data.data.complaints.length === 0) {
        setHasData(false);
      } else {
        setcomplaints((prev) => [...prev, ...data.data.complaints]);
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

  return (
    <>
            <Helmet><title> الشكاوى</title></Helmet>

      <div className="divflex">
        {complaints.map((item) => (
          <ComplaintsCard key={item.id} data={item} />
        ))}
      </div>

      {!isLoading && complaints.length === 0  && (
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد شكاوى</h4>
          <img style={{ width: '30px', color: 'black' }} src={nothing} alt="error" />
        </div>
      )}

      {isLoading && complaints.length === 0 &&  (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="loader">
          <Bars height="80" width="80" color="#77ffab " ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={isLoading} />
        </div>
      )}

      {complaints.length > 0 && <ButtonDelete onClick={handleOpenModalDeleteAllComplaints} />}

      <ToastContainer />

      {modalDeleteAllComplaintsIsOpen && <ModalForDeleteAllComplaint api={handleDeleteAllComplaintsApi} close={handleCloseModalDeleteAllComplaints} />}
    </>
  );
};
