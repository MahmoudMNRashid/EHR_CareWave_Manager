import React, { useState } from 'react'
import classes from './ComplaintsCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../../Util/Auth'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
import { ModalForDeleteOneComplaint } from './ModalForDeleteOneComplaint'
import LoadingBar from 'react-top-loading-bar'
export const ComplaintsCard = (props) => {
    const nav = useNavigate()
    
    const date = new Date(props.data.date)
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("ar", options);
    const [isLoading, setIsLoading] = useState(false);
const [ModalDeleteComplaintIsOpen,setModalDeleteComplaintIsOpen]=useState(false)
const handleCloseModalDeleteComplaint=()=>{
    setModalDeleteComplaintIsOpen(false)
}
const handleOpenModalDeleteComplaint=()=>{
    setModalDeleteComplaintIsOpen(true)
}
    const handelDeleteComplaintApi = async () => {
        
        setIsLoading(true);
        try {
            const response = await fetch(
                'http://localhost:8000/v1/Complaint/deleteComplaint', {
                method: 'DELETE',
                body: JSON.stringify({ id: props.data.id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`
                }
            }
            )
            if (!response.ok) {
                throw new Error();
            }
            toast.success('تم الحذف بنجاح', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            nav('/dashboardSysAdmin/Complaints')
            

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
            nav('/dashboardSysAdmin/Complaints')
        }
        setIsLoading(false);
    }
    return (
<>
        <div className={classes.a}>

            <div className={classes.b}>
                <h4>معلومات الشكوى</h4>
                <button onClick={handleOpenModalDeleteComplaint}> <FontAwesomeIcon style={{ color: '#FF3333' }} icon={faTrashCan} /></button>
            </div>
            <div className={classes.c}>

                <div className={classes.d}>
                    <span>المشتكى عليه</span>
                    <p> {`الطبيب ${props.data.namedoctor}`}</p>
<button><FontAwesomeIcon icon={ faLongArrowLeft}/></button>
                </div>


                <div className={classes.d}>
                    <span> التاريخ</span>
                    <p>{formattedDate}</p>

                </div>
                <div className={classes.d}>
                    <span> الشكوى</span>
                    <p> {props.data.complainText}</p>
                </div>




            </div>
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
{ModalDeleteComplaintIsOpen && <ModalForDeleteOneComplaint close={handleCloseModalDeleteComplaint} api={handelDeleteComplaintApi}/>} 
        </>

    )
}
