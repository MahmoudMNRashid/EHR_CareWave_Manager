import React from 'react'
import classes from './ButtonVerifyAll.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

export const ButtonVerifyAll = (props) => {


    return (
        <button onClick={props.onClick} className={classes.Btn}>

            <div className={classes.sign}>
                <FontAwesomeIcon style={{ color: '#77ffab' }} icon={faCheckDouble} />
            </div>

            <div className={classes.text}>  تأكيد الكل</div>
        </button>



    )
}
