import React, { useState } from 'react'
import classes from './AddTipForm.module.css'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../Util/Auth';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
export const AddTipForm = (props) => {
  console.log(props.data)
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [progress, setProgress] = useState(0)
  const [enteredDesc, setEnteredDesc] = useState('');
  const [enteredDescTouched, setEnteredDescTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const nav = useNavigate()
  const enteredNameIsValid = enteredName.trim() !== '' && enteredName.length > 3;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredDescIsValid = enteredDesc !== '' && enteredDesc.length > 6;
  const DescInputIsInvalid = !enteredDescIsValid && enteredDescTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredDescIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const DescInputChangeHandler = (event) => {
    setEnteredDesc(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const DescInputBlurHandler = (event) => {
    setEnteredDescTouched(true);
  };
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    setEnteredNameTouched(true);
    setProgress(progress + 10)
    if (!enteredNameIsValid || !enteredDescIsValid) {
      return;
    }

    const info = {
      title: enteredName,
      post: enteredDesc
    }
    console.log(info)

    // console.log(enteredDesc)
    try {
      const response = await fetch('http://localhost:8000/v1/Tips/addTips', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`bearer ${getToken()} `


        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      
      toast.success('تم إضافة النصيحة', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      nav('/dashboardSysAdmin/MedicalTips')
    



    } catch (error) {

       
        toast.error('!حدث خطأ ما', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      

    }

    setIsLoading(false);
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredDesc('');
    setEnteredDescTouched(false);
  };
  return (
    <>
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <input
        type="text"
        placeholder="العنوان"
        className={`${classes.input} ${nameInputIsInvalid ? classes.invalid : ''}`}
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler}
        value={enteredName}
       
      />
      {nameInputIsInvalid && (
        <p className='error-text'>  الأسم يجب أن لا يكون فارغ وأقل من 3 أحرف .</p>
      )}
      <textarea
        placeholder="النصيحة"
        onChange={DescInputChangeHandler}
        onBlur={DescInputBlurHandler}
        value={enteredDesc}
        className={` ${DescInputIsInvalid ? classes.invalid : ''}`}
       
        
        
      >
      </textarea>
      {DescInputIsInvalid && (
        <p className='error-text'> الوصف لا يجب ان يكون فارغ و أقل من 6 أحرف.</p>
      )}
      <button disabled={!formIsValid}>إضافة</button>
    </form>
    {isLoading && <LoadingBar color="#f11946" progress={progress}
    onLoaderFinished={() => setProgress(0)} />}
   
    </>
  )
}
