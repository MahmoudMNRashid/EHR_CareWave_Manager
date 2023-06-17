import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import classes from './UpgradeAccountForm.module.css'
import { MainInput } from '../UI/MainInput'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getToken } from '../../Util/Auth'
import LoadingBar from 'react-top-loading-bar'
export const UpgradeAccountForm = () => {

  const [enteredidSyr, setEnteredidSyr] = useState('');
  const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);

  const [enteredidMedical, setEnteredidMedical] = useState('');
  const [enteredidMedicalTouched, setEnteredidMedicalTouched] = useState(false);

  const [enteredspecialization, setEnteredspecialization] = useState('');
  const [enteredspecializationTouched, setEnteredspecializationTouched] = useState(false);

  const [enteredSelectedType, setSelectedType] = useState('اختر الفئة الطبية');
  const [enteredSelectedTypeTouched, setEnteredelectedTypeTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


 
  const enteredidSyrIsValid = enteredidSyr.length === 11;
  const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;

  const enteredSelectedTypelIsValid = enteredSelectedType !== 'اختر الفئة الطبية';

  const SelectedTypeInputIsInvalid = !enteredSelectedTypelIsValid && enteredSelectedTypeTouched;

  const enteredspecializationIsValid = (enteredSelectedType==='doctor' && enteredspecialization !== '') ||  ((enteredSelectedType==='radiographer'||enteredSelectedType==='analyzer'||enteredSelectedType==='pharmaceutical' )&&enteredspecialization === '');
  const specializationlInputIsInvalid = !enteredspecializationIsValid && enteredspecializationTouched;

  const enteredidMedicalIsValid = enteredidMedical !== '' && enteredidMedical.length > 6;
  const idMedicalInputIsInvalid = !enteredidMedicalIsValid && enteredidMedicalTouched;

  let formIsValid = false;

  if (enteredidSyrIsValid && enteredidMedicalIsValid && enteredSelectedTypelIsValid && enteredspecializationIsValid) {
    formIsValid = true;
  }
  const idSyrInputChangeHandler = (event) => {
    setEnteredidSyr(event.target.value);
  };

  const idMedicalInputChangeHandler = (event) => {
    setEnteredidMedical(event.target.value);
  };
  const specializationInputChangeHandler = (event) => {
    setEnteredspecialization(event.target.value);
  };
  const SelectedTypeInputChangeHandler = (event) => {
    setSelectedType(event.target.value);
  };






  const idSyrInputBlurHandler = (event) => {
    setEnteredidSyrTouched(true);
  };

  const idMedicalInputBlurHandler = (event) => {
    setEnteredidMedicalTouched(true);
  };
  const specializationInputBlurHandler = (event) => {
    setEnteredspecializationTouched(true);
  };
  const SelectedTypeInputBlurHandler = (event) => {
    setEnteredelectedTypeTouched(true);
  };


  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    setEnteredidSyrTouched(true);

    if (!enteredidSyrIsValid || !enteredSelectedTypelIsValid || !enteredidSyrIsValid ) {
      return;
    }

    const specializ= enteredSelectedType==="doctor" ?enteredspecialization : "_"
    const info = {
      syrid: enteredidSyr,
      medicalId: enteredidMedical,
      type: enteredSelectedType,
      specialization: specializ
    }

    // console.log(enteredPassword)
    try {
      const response = await fetch('http://localhost:8000/v1/User/developaccount', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`bearer ${getToken()}`

        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      toast.success('تم تطوير الحساب بنجاح ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });


    } catch (error) {

      if (error.message === 'cannot found data match with this info.') {
        toast.warn('تحقق من المعلومات ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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

    }

    setIsLoading(false);
    setEnteredidSyr('');
    setEnteredidSyrTouched(false);

    setEnteredidMedical('');
    setEnteredidMedicalTouched(false);

    setEnteredspecialization('');
    setEnteredspecializationTouched(false);

    setSelectedType('اختر الفئة الطبية')
    setEnteredelectedTypeTouched(false)
  };





  const configurationidSyr = {
    type: 'text',
    label: 'الرقم الوطني  '

  }
  const configurationidMedical = {
    type: 'text',
    label: 'الرقم الطبي'

  }
  const configurationspecialization = {
    type: 'text',
    label: 'التخصص'

  }
  return (
    <>
    <form className={classes.form_} onSubmit={formSubmissionHandler} >
      <div>

        <MainInput configuration={configurationidSyr}
          onChange={idSyrInputChangeHandler}
          onBlur={idSyrInputBlurHandler}
          value={enteredidSyr}
          isInvalid={idSyrInputIsInvalid}
        />
        {idSyrInputIsInvalid && (
          <p className='error-text'>يجب ان يتألف الرقم الوطني من 11 خانة.</p>
        )}
      </div>
      <div>
        <MainInput
          configuration={configurationidMedical}
          onChange={idMedicalInputChangeHandler}
          onBlur={idMedicalInputBlurHandler}
          value={enteredidMedical}
          isInvalid={idMedicalInputIsInvalid}
        />
        {idMedicalInputIsInvalid && (
          <p className='error-text'>  يجب أن يتألف الرقم الطبي من 11 خانة.</p>
        )}
      </div>
      <div>
        <select
          className={`${classes.select} ${SelectedTypeInputIsInvalid ? classes.invalid : ''} `}
          aria-label="Default select example"
          onChange={SelectedTypeInputChangeHandler}
          onBlur={SelectedTypeInputBlurHandler}
          value={enteredSelectedType}
        >
          <option className={classes.option} value='اختر الفئة الطبية' >اختر الفئة  الطبية </option>
          <option className={classes.option} value="doctor">طبيب</option>
          <option className={classes.option} value="radiographer">مصور أشعة</option>
          <option className={classes.option} value="analyzer">مخبري</option>
          <option className={classes.option} value="pharmaceutical">صيدلي</option>

        </select>
        {SelectedTypeInputIsInvalid && (
          <p className='error-text'>الرجاء اختيار الفئة الطبية .</p>
        )}
      </div>
      <div>
        {enteredSelectedType === "0" && <MainInput
          configuration={configurationspecialization}
          onChange={specializationInputChangeHandler}
          onBlur={specializationInputBlurHandler}
          value={enteredspecialization}
          isInvalid={specializationlInputIsInvalid}
        />}
        {specializationlInputIsInvalid && enteredSelectedType === "0" && (
          <p className='error-text'>  الرجاء اختر التخصص.</p>
        )}
      </div>
      <button  disabled={!formIsValid} variant="primary" type="submit" className={classes.button}  >
        تطوير
      </button>

    </form>
     <ToastContainer />
     {isLoading && <LoadingBar color='#f11946' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
     </>
  )
}
