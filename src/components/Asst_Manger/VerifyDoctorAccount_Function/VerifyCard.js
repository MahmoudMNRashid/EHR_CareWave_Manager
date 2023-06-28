import React, { useState } from 'react'
import classes from './VerifyCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import name from '../../../style/DoctorCard/id-card (1).png'
import idSyr from '../../../style/DoctorCard/id-card (2).png'
import idMedicne from '../../../style/DoctorCard/medical-staff.png'
import phone from '../../../style/DoctorCard/iphone.png'
import Governorate from '../../../style/DoctorCard/real-state.png'
import address from '../../../style/DoctorCard/location.png'
import speacliazion from '../../../style/DoctorCard/stethoscope.png'
import typee from '../../../style/type.png'
import { ModalForShowImages } from './ModalForShowImages'

export const VerifyCard = (props) => {
    console.log(props.data)
    const [modalShowImagesIsOpen, setmodalShowImagesIsOpen] = useState(false)

    const handleOpenModalShowImages = _ => setmodalShowImagesIsOpen(true)
    const handleCloseModalShowImages = _ => setmodalShowImagesIsOpen(false)


    const images = [
        `http://localhost:8000${props.data.forgroundImage}`,
        `http://localhost:8000${props.data.backgroundImage}`,
        `http://localhost:8000${props.data.identify}`

    ]

    const roleId = props.data.roleId - 1
    return (
        <>
            <div className={classes.container}>
                <div className={classes.up}>
                    <div className={classes.containerInfo}>
                        <img src={name} alt='error' />
                        <p>{props.data.name}</p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={idSyr} alt='error' />
                        <p>{props.data.idNumber}</p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={idMedicne} alt='error' />
                        <p>{props.data.medicalNumber}</p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={phone} alt='error' />
                        <p>{props.data.phone}</p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={Governorate} alt='error' />
                        <p> {props.data.governerate} </p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={address} alt='error' />
                        <p> {props.data.address} </p>
                    </div>
                    <div className={classes.containerInfo}>
                        <img src={typee} alt='error' />
                        {roleId === 0 ? <p>طبيب </p> : (roleId === 1 ? <p>مصور أشعة </p> : (roleId === 2 ? <p>مخبري </p> : <p>صيدلي </p>))}
                    </div>
                    {
                        roleId === 0 && <div className={classes.containerInfo}>
                            <img src={speacliazion} alt='error' />
                            <p> {props.data.specialization}</p>
                        </div>
                    }


                </div>
                <div className={classes.middle}>

                    <p>  صور البطاقة الشخصية و البطاقة الطبية</p>
                    <button onClick={handleOpenModalShowImages}> <FontAwesomeIcon icon={faArrowLeftLong} /></button>

                </div>
                <div className={classes.down}>

                    <button onClick={() => {
                        props.api(props.data.id)
                    }}>تأكيد</button>
                    <button>رفض</button>
                </div>
            </div>

            {modalShowImagesIsOpen && <ModalForShowImages images={images} close={handleCloseModalShowImages} />}
        </>

    )
}
