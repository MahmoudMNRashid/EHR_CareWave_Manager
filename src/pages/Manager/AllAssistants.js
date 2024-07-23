import React, { useEffect, useState } from 'react'
import { AssistantCard } from '../../components/Manager/AllAssistants_Function/AssistantCard'
import { getToken } from '../../Util/Auth';
import { ToastContainer, toast } from 'react-toastify';
import nothing from '../../style/nothing (1).png';
import { Helmet } from 'react-helmet';
export const AllAssistants = () => {
    const [Assistants, setAssistants] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(true);


    const forRefreshPage=(id)=>{
        const AssistantsEdit = Assistants.filter((item)=>{
            return item.id!==id
        })
        setAssistants(AssistantsEdit)

    }

    const fetchAllAssistants = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/v1/User/register/AdminAssistance/${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${getToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('شيء ما حدث');
            }

            const data = await response.json();

            if (data.data.info.length === 0) {
                setHasData(false);
            } else {
                
                setAssistants((prev) => [...prev, ...data.data.info]);
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
        
        fetchAllAssistants();
    }, [page]);

    const handlePageUpdate = () => {
        setAssistants([]);
        setPage(1);
      };
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
        <Helmet><title> مساعديين مدير النظام</title></Helmet>
        <div className='divflex'>
            {Assistants.map((item) => (
                <AssistantCard key={item.id} data={item} refresh={forRefreshPage} />
            ))}

        </div>


        {!isLoading && Assistants.length === 0  && (
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
          <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد مدراء</h4>
          <img style={{ width: '30px', color: 'black' }} src={nothing} alt="error" />
        </div>
      )}



      <ToastContainer />

      
        </>
        
    )
}



