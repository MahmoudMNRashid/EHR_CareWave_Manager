import React, { useState } from 'react'
import classes from './AddNewSpecializationCard.module.css'
import { MainInput } from '../../UI/MainInput'
import excel from '../../../style/file.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
export const AddNewSpecializationCard = () => {
    function containsSpecialCharacters(str) {
        var pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return pattern.test(str);
    }
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const [isLoading, setIsLoading] = useState(false);
    const enteredNameIsValid = enteredName.trim() !== '' && !containsSpecialCharacters(enteredName);
    const enteredFileIsValid = selectedFile !== ''
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    let formIsValid = false;
    if (enteredNameIsValid) {
        formIsValid = true;
    }
    let form1IsValid = false
    if (enteredFileIsValid) {
        form1IsValid = true
    }
    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const nameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
    };
    const AddNameDiseaseApi = async event => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredNameTouched(true);
        if (!enteredNameIsValid) {
            return;
        }

        const info = {
            Name: enteredName
        }
        try {
            const response = await fetch(`http://localhost:8000/v1/specialization/addSpecialization/one`, {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`
                }
            })
            if (!response.ok) {

                console.log(response)
                const data = await response.json()
                throw data
            }

            const data = await response.json()


            if(data.data.message.message==='Added successfully.'){
                toast.success('!تم الإضافة بنجاح', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }



        } catch (error) {
            console.log(error.message)
            if (error.message === 'Cannot add because this specialization is exists.') {
                toast.warning('!التخصص موجود', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            } else {
                toast.error('!حدث خطأً ما', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }


        }



        setIsLoading(false);

        setEnteredNameTouched(false);



    }
    const AddFileDiseaseApi = async event => {
        event.preventDefault();
        setIsLoading(true);

        if (!enteredFileIsValid) {
            return;
        }


        const formData = new FormData()
        formData.append('file', selectedFile)


        try {

            const response = await fetch('http://localhost:8000/v1/Specialization/addSpecialization/many', {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `bearer ${getToken()}
                     `


                },
            });


            if (!response.ok) {
                const data = await response.json()

                throw data;
            }

            const data = await response.json()
             if(data.data.message==='Added successfully.'){
                toast.success(' تم إضافة الملف كاملاً', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
               
            }





        } catch (error) {

            if (error.message === 'Cannot add because this specialization is exists.') {
                toast.warning('!التخصصات موجودة ', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
            else{
            toast.error('!حدث خطأً ما', {
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
        setSelectedFile('')






    }
    const nameDiseaseConfiguration = {
        type: 'text',
        label: 'اسم التخصص'
    }
    return (
        <>
            <div className={classes.container} >
                <div className={classes.right}>

                    <div>
                        <p >  إدخال تخصص جديد </p>

                    </div>
                    <div>
                        <MainInput
                            configuration={nameDiseaseConfiguration}
                            onChange={nameInputChangeHandler}
                            onBlur={nameInputBlurHandler}
                            value={enteredName}
                            isInvalid={nameInputIsInvalid}
                        />
                        {nameInputIsInvalid && <p style={{ fontSize: '10px' }} className='error-text'>الأسم فارغ.</p>}
                    </div>

                    <div>
                        <button onClick={AddNameDiseaseApi} disabled={!formIsValid}><FontAwesomeIcon style={{ color: '#31af99', fontSize: '28px' }} icon={faPlusCircle} /></button>
                    </div>
                </div>


                <div className={classes.left}>
                    <div> <p >  إدخال تخصصات من ملف أكسل </p></div>
                    <div>
                        <label htmlFor="fileInput">
                            <img src={excel} alt="Choose File" />
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".xlsx, .xls"

                        />
                        {selectedFile ? <p>{selectedFile.name}</p> : <p>لم يتم اختيار ملف </p>}
                    </div>



                    <div>
                        <button onClick={AddFileDiseaseApi} disabled={!form1IsValid}><FontAwesomeIcon style={{ color: '#31af99', fontSize: '28px' }} icon={faPlusCircle} /></button>
                    </div>
                </div>





            </div>
            <ToastContainer />
            {
                isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </>
    )
}
