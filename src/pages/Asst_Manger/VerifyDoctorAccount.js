import React, { useEffect, useState } from 'react'


import { getToken } from '../../Util/Auth'
import nothing from '../../style/nothing (1).png';
import { ToastContainer, toast } from 'react-toastify'
import { VerifyCard } from '../../components/Asst_Manger/VerifyDoctorAccount_Function/VerifyCard'
import { Bars } from 'react-loader-spinner';
import { ButtonVerifyAll } from '../../components/Asst_Manger/VerifyDoctorAccount_Function/ButtonVerifyAll';
import { ModalForVerifyAll } from '../../components/Asst_Manger/VerifyDoctorAccount_Function/ModalForVerifyAll';
export const VerifyDoctorAccount = () => {

  const [doctors, setdoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(true);


  const [ModalVerifyALlIsOpen, setModalVerifyALlIsOpen] = useState(false)
  const handleOpenModalVerifyAll = _ => setModalVerifyALlIsOpen(true)
  const handleCloseModalVerifyAll = _ => setModalVerifyALlIsOpen(false)



  const fetchAllVerifyAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/v1/User/register/Doctor/notConfirm/${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`


        },
      })

      if (!response.ok) {
        throw new Error('شيء ما حدث');
      }

      const data = await response.json();

      if (data.data.doctors.length === 0) {
        setHasData(false);
      } else {
        setdoctors((prev) => [...prev, ...data.data.doctors]);
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

  }

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
    fetchAllVerifyAccounts();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);



  const VerifyAllAccountApi = async () => {

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/v1/User/register/ConfirmAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('شيء ما حدث');
      }

      const data = await response.json();

      if (data.data.message === 'confirm all accounts') {
        toast.success('تم تأكيد الكل', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setdoctors([])
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
      handleCloseModalVerifyAll()
    }
  }


  const handleVerifyDoctor = async (id) => {
    try {
      console.log(id)
      const response = await fetch('http://localhost:8000/v1/User/register/Doctor/confirmDoctor', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`
        }
      })
      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
   console.log(data)

      if (data.data.message === 'Confirm Successfully.') {
        toast.success('تم  تأكيد الحساب ', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        const editDoctor = doctors.filter(item => item.id !== id)
        
        setdoctors(editDoctor)
      }



    } catch (error) {
      console.log(error)
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

      <div className='divflex'>
        {
          (doctors.map((item) => {
            return (
              <VerifyCard key={item.id} data={item} api={handleVerifyDoctor} />
            )

          }))
        }

      </div>
      {!isLoading && doctors.length === 0 && (
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
          <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد حسابات غير مؤكدة</h4>
          <img style={{ width: '30px', color: 'black' }} src={nothing} alt="error" />
        </div>
      )}
      {isLoading && doctors.length === 0 && (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="loader">
          <Bars height="80" width="80" color="#77ffab " ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={isLoading} />
        </div>
      )}
      {doctors.length > 0 && <ButtonVerifyAll onClick={handleOpenModalVerifyAll} />}
      {ModalVerifyALlIsOpen && <ModalForVerifyAll api={VerifyAllAccountApi} close={handleCloseModalVerifyAll} />}
      <ToastContainer />
    </>
  )
}

