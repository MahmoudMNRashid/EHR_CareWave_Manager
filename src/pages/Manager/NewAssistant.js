import React, { useState } from 'react'
import classes from './NewAssistant.module.css'
import { getToken } from '../../Util/Auth';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


import { MainInput } from '../../components/UI/MainInput';
import { ModalForAddNewAssistant } from '../../components/Manager/AddAssistant_Function/ModalForAddNewAssistant';
import { Helmet } from 'react-helmet';
export const NewAssistant = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  function containsSpecialCharacters(str) {
    var pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return pattern.test(str);
  }
  const [ModalShowPassowrdIsOpen, setModalShowPassowrdlIsOpen] = useState(false)
  const [Password, setPassword] = useState('');

  const enteredNameIsValid = enteredName.trim() !== '' && enteredName.trim().length > 3 && !containsSpecialCharacters(enteredName);
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  const ModalShowPassowrdCloseHandler = () => {
    setModalShowPassowrdlIsOpen(false)
  }



  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setEnteredNameTouched(true);
    if (!enteredNameIsValid) {
      return;
    }

    const info = {
      nameAdminAssistance: enteredName
    }


    try {
      const response = await fetch('http://localhost:8000/v1/User/register/AdminAssistance', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`


        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }

      const data = await response.json()
      setPassword(data.data.password)
      setModalShowPassowrdlIsOpen(true)
      toast.success('تم الإضافة', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {

      if (error.message === 'The name must be : more 3 characters. Each character can be a lowercase letter, an uppercase letter, or a number') {
        toast.warn('الاسم يجب ان يكون اكثر من ثلاث احرف ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }
      if (error.message === 'Name is already exists. please rename this name.') {
        toast.warn('الاسم موجود', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        toast.error('!حدث خطأ ما', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    }

    setIsLoading(false);
    setEnteredName('');
    setEnteredNameTouched(false);


  };
  const configurationNameLogin = {
    type: 'text',
    label: 'الأسم'

  }
  return (
    <>
                <Helmet><title>إضافة مساعد جديد</title></Helmet>

      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <span className={classes.title}>مساعد مدير النظام</span>
        <p className={classes.description}>
          في عصر التكنولوجيا الحديثة  أصبحت المنظمات الصحية تعتمد بشكل كبير على النظم الإلكترونية لتسهيل سير عملها وتحسين جودة الرعاية الصحية التي تقدمها. ولتحقيق هذه الأهداف، فإن لدينا مساعد مدير النظام الذي يعتبر عمودًا فقريًا لعملنا يعمل مساعد مدير النظام على تطوير وتنفيذ السياسات والإجراءات الفنية اللازمة لضمان استقرار وأمان نظام  الخاص بنا. إنه الشخص الذي يتحمل مسؤولية حماية بيانات المرضى الحساسة وضمان توافر النظام بشكل مستمر ومواكبة التقدم التكنولوجي المستمر وتلبية احتياجاتنا المتغيرة
        </p>
        <div>

          <MainInput
            configuration={configurationNameLogin}
            onBlur={nameInputBlurHandler}
            value={enteredName}
            isInvalid={nameInputIsInvalid}
            onChange={nameInputChangeHandler}
          />
          <button disabled={!formIsValid} >إضافة</button>

        </div>
        {nameInputIsInvalid && (
          <p className='error-text'>الأسم فارغ.</p>
        )}
        {ModalShowPassowrdIsOpen && <ModalForAddNewAssistant password={Password} close={ModalShowPassowrdCloseHandler} />}

      </form>
     
      <ToastContainer/>
      {
        isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
      }
    </>
  )
}
