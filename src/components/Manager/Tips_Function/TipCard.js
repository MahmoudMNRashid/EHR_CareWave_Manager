import React, { useState } from 'react'
import classes from './TipCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import title from '../../../style/title (1).png'
import info from '../../../style/information (1).png'
import { ModalForDeleteOneTip } from './ModalFordeleteOneTip'
import { ModalForUpdateOrAddTip } from './ModalForUpdateOrAddTip'
import LoadingBar from 'react-top-loading-bar'
export const TipCard = (props) => {
 

    const [ModalDeleteTipIsOpen, setModalDeleteTipIsOpen] = useState(false)
    const handleCloseModalDeleteComplaint = () => {
        setModalDeleteTipIsOpen(false)
    }
    const handleOpenModalDeleteComplaint = () => {
        setModalDeleteTipIsOpen(true)
    }
    const [ModalUpdateOrAddTipIsOpen, setModalUpdateOrAddTipIsOpen] = useState(false)
    const handleCloseModalUpdateOrAddTip = () => {
        setModalUpdateOrAddTipIsOpen(false)
    }
    const handleOpenModalUpdateOrAddTip = () => {
        setModalUpdateOrAddTipIsOpen(true)
    }
    const [isLoading, setIsLoading] = useState(false);
   
    
    return (
        <>
            <div className={classes.a}>

                <div className={classes.b}>
                    <h4>النصيحة  </h4>
                    <div style={{ display: 'flex', gap: '10px' }}>

                        <button onClick={handleOpenModalUpdateOrAddTip}> <FontAwesomeIcon style={{ color: 'black' }} icon={faEdit} /></button>
                        <button onClick={handleOpenModalDeleteComplaint}> <FontAwesomeIcon style={{ color: '#FF3333' }} icon={faTrashCan} /></button>
                    </div>
                </div>
                <div className={classes.c}>

                    <div className={classes.d}>
                        <img style={{ width: '28px' }} src={title} alt='error' />

                        <p>  {props.data.titile}</p>

                    </div>

                    <div className={classes.d}>
                        <img style={{ width: '28px' }} src={info} alt='error' />
                        <p>{props.data.post}</p>
                    </div>




                </div>
            </div>
           { ModalUpdateOrAddTipIsOpen &&<ModalForUpdateOrAddTip refreash={props.refreash} edit={true} data={props.data} close={handleCloseModalUpdateOrAddTip}/>}
            {ModalDeleteTipIsOpen && <ModalForDeleteOneTip close={handleCloseModalDeleteComplaint} api={props.api} idTip={props.data.id} />}
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </>

    )
}
