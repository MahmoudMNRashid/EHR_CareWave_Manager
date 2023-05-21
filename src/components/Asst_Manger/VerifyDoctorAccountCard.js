import React from 'react'
import classes from './VerifyDoctorAccountCard.module.css'
import id1 from '../../style/id1.png'
import id2 from '../../style/id2.png'
import id3 from '../../style/id3.png'

export const VerifyDoctorAccountCard = () => {
  return (
    <div className={classes.big}>

        <div className={classes.left}> 
        <div className={classes.textcontainer}>
            <p className={`${classes.text} ${classes.textfirst}`} >الاسم: ابو عمار الروح</p>
            <p className={classes.text} >الرقم الوطني:258525232511</p>
            <p className={classes.text} >الرقم الطبي:555668653222</p>
            </div>
            <div className={classes.buttoncontainer}>

            <button variant="primary" type="submit" className={classes.button}  >
        تأكيد   
        </button>
            <button variant="primary" type="submit" className={classes.button}  >
        رفض 
        </button>
            </div>

        </div>

        <div className={classes.right}>
            
            
            <div  className={classes.divimg}>
                <img className={classes.img} alt=''  src={id1}/>
            </div>
            <div   className={classes.divimg}>
                <img className={classes.img} alt='' src={id2}/>
            </div>
            <div   className={classes.divimg}>
                <img className={classes.img} alt='' src={id3}/>
            </div>
            
            
            
            
            
        </div>



        
    </div>
  )
}
