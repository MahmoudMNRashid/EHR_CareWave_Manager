import React from 'react'
import classes from './VerifyDoctorAccountCard.module.css'


export const VerifyDoctorAccountCard = (props) => {
    const imagePath = '/download(1)-192109417379.jpeg'; 
    return (
    <div className={classes.big}>

        <div className={classes.left}> 
        <div className={classes.textcontainer}>
            <p className={`${classes.text} ${classes.textfirst}`} >{`الاسم: ${props.data.name}`}</p>
            <p className={classes.text} >  {`الرقم الوطني:${props.data.idNumber}`} </p>
            <p className={classes.text} > {`الرقم الطبي:${props.data.medicalNumber}`}</p>
            </div>
            <div className={classes.buttoncontainer}>

            <button onClick={()=>{
                props.api(props.data.id)
            }} variant="primary" type="submit" className={classes.button}  >
        تأكيد   
        </button>
            <button variant="primary" type="submit" className={classes.button}  >
        رفض 
        </button>
            </div>

        </div>

        <div className={classes.right}>
            
            
            <div  className={classes.divimg}>
                <img className={classes.img} 
                alt='error'
                  src={`http://localhost:8000${props.data.forgroundImage}`}/>
            </div>
            <div   className={classes.divimg}>
                <img className={classes.img} alt='' src={`http://localhost:8000${props.data.backgroundImage}`}/>
            </div>
            <div   className={classes.divimg}>
                <img className={classes.img} alt='' src={`http://localhost:8000${props.data.identify}`}/>
            </div>
            
            
            
            
            
        </div>



        
    </div>
  )
}
