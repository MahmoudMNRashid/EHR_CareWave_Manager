import React, { useState } from 'react'
import classes from './AssistantCard..module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import assistant from '../../../style/assistant.png'
import { ModalForDeleteAssistant } from './ModalForDeleteAssistant'
import { getToken } from '../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AssistantCard = (props) => {
    const nav = useNavigate()
    const [modalDeleteAssistantIsOpen, setModalDeleteAssistantIsOpen] = useState(false);
    const handleCloseModalDeleteAssistant = () => {
        setModalDeleteAssistantIsOpen(false);
    };
    const handleOpenModalDeleteAssistant = () => {
        setModalDeleteAssistantIsOpen(true);
    };

    const handleDeleteAllComplaintsApi = async () => {
        console.log(props.data.id)
        try {
            const response = await fetch('http://localhost:8000/v1/User/register/AdminAssistance', {
                method: 'DELETE',
                body: JSON.stringify({ id: props.data.id }),
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`,
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
            handleCloseModalDeleteAssistant()
            props.refresh(props.data.id)
        }


    };
    return (
        <>
            <div className={classes.container}>


                <div className={classes.infocontainer}>
                    <img src={assistant} alt='error' />
                    <p>   {props.data.name} </p>

                </div>
                <div className={classes.buttoncontainer} >

                    <button onClick={handleOpenModalDeleteAssistant}> <FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            </div>
            {modalDeleteAssistantIsOpen && <ModalForDeleteAssistant api={handleDeleteAllComplaintsApi} close={handleCloseModalDeleteAssistant} />}
        </>
    )
}
