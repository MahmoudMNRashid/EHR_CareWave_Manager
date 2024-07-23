import React from 'react'
import classes from './Reports.module.css'
import { useState } from 'react';
import { MainInput } from '../../UI/MainInput'
import reports from '../../../style/report.png'


import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { ChartWithDate } from './ChartWithDate';
import { ChartWithoutDate } from './ChartWithoutDate';


export const ReportsComponent = () => {
    const [filters, setFilters] = useState({
        gender: 'الجنس',
        governorate: 'المحافظة',
        dateFilter: 'فلترة التاريخ',
        fromDate: '2000-01-01',
        toDate: '2000-01-01',
        nameDieses: '',
        ageFilter: 'فلترة العمر',
        minAge: '0',
        maxAge: '0',
    });

    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const [enteredGovernorateTouched, setEnteredGovernorateTouched] = useState(false);
    const [enteredAgeFilterTouched, setEnteredAgeFilterTouched] = useState(false);
    const [enteredGenderTouched, setEnteredGenderTouched] = useState(false);
    const [enteredDateFilterTouched, setEnteredDateFilterTouched] = useState(false);
    const [enteredAgeTouched, setEnteredAgeTouched] = useState(false);
    const [enteredAgeMaxTouched, setEnteredAgeMaxTouched] = useState(false);
    const [enteredDateTouched, setEnteredDateTouched] = useState(false);
    const [enteredBigDateTouched, setEnteredBigDateTouched] = useState(false);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [info, setinfo] = useState([])
    const [isHasDate, setisHasDate] = useState('')

     

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredAgeFilterTouched(true)
        setEnteredAgeMaxTouched(true)
        setEnteredAgeTouched(true)
        setEnteredBigDateTouched(true)
        setEnteredDateFilterTouched(true)
        setEnteredDateTouched(true)
        setEnteredGenderTouched(true)
        setEnteredGovernorateTouched(true)
        setEnteredNameTouched(true)

        if (filters.ageFilter === '*') {

            if (filters.dateFilter === 'disable') {

                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid) {
                    return
                }
            }
            else if (filters.dateFilter === 'between') {

                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredBigDateIsValid || !enteredDateIsValid) {
                    return
                }

            }
            else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {

                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredDateIsValid) {
                    return
                }
            }
        }

        if (filters.ageFilter === 'between') {
            if (filters.dateFilter === 'disable') {
                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredAgeMaxIsValid || !enteredAgeIsValid) {
                    return
                }
            }

            else if (filters.dateFilter === 'between') {
                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredBigDateIsValid || !enteredDateIsValid || !enteredAgeMaxIsValid || !enteredAgeIsValid) {
                    return
                }

            }
            else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {
                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredDateIsValid || !enteredAgeMaxIsValid || !enteredAgeIsValid) {
                    return
                }
            }
        }
        if ((filters.ageFilter === 'lt' || filters.ageFilter === 'gt' || filters.ageFilter === 'equal') && filters.ageFilter !== 'فلترة العمر') {


            if (filters.dateFilter === 'disable') {

                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredAgeIsValid) {
                    return
                }
            }
            else if (filters.dateFilter === 'between') {

                if (!enteredNameIsValid || enteredGovernorateIsValid || !enteredGenderIsValid || !enteredBigDateIsValid || !enteredDateIsValid || !enteredAgeIsValid) {
                    return
                }

            }
            else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {

                if (!enteredNameIsValid || !enteredGovernorateIsValid || !enteredGenderIsValid || !enteredDateIsValid || !enteredAgeIsValid) {
                    return
                }
            }
        }

        let date = '*'
        if (filters.dateFilter === 'disable') {
            date = '*'
        } else if (filters.dateFilter === 'lt') {
            date = `less(${filters.fromDate})`
        } else if (filters.dateFilter === 'gt') {
            date = `more(${filters.fromDate})`
        } else if (filters.dateFilter === 'equal') {
            date = `equal(${filters.fromDate})`
        } else if (filters.dateFilter === 'between') {
            date = `between(${filters.fromDate},${filters.toDate})`
        }

        let governorate = '*'
        if (filters.governorate === '*') {
            governorate = '*'
        } else {
            governorate = `${filters.governorate}`
        }
        let gender = '*'
        if (filters.gender === '*') {
            gender = '*'
        } else {
            gender = `${filters.gender}`
        }


        let age = '*'
        if (filters.ageFilter === 'disable') {
            age = '*'
        } else if (filters.ageFilter === 'lt') {
            age = `less(${filters.minAge})`
        } else if (filters.ageFilter === 'gt') {
            age = `more(${filters.maxAge})`
        } else if (filters.ageFilter === 'equal') {
            age = `equal(${filters.minAge})`
        } else if (filters.dateFilter === 'between') {
            age = `between(${filters.minAge},${filters.maxAge})`
        }






        try {
            const response = await fetch(`http://localhost:8002/Report?expression=age=${age}~date=${date}~gender=${gender}~governerate=${governorate}~Disease=${filters.nameDieses}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `bearer ${getToken()}`


                },
            });
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                throw data;
            }
            const data = await response.json()




            setinfo(data.data.person)
            if (date === '*') {
                setisHasDate(false)
            } else {
                setisHasDate(true)
            }





        } catch (error) {


            toast.error('حدث خطأ ما الرجاء إعادة المحاولة', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        }
        setIsLoading(false);

        ;
        setEnteredAgeFilterTouched(false)
        setEnteredAgeMaxTouched(false)
        setEnteredAgeTouched(false)
        setEnteredBigDateTouched(false)
        setEnteredDateFilterTouched(false)
        setEnteredDateTouched(false)
        setEnteredGenderTouched(false)
        setEnteredGovernorateTouched(false)
        setEnteredNameTouched(false)
    };

    function containsSpecialCharacters(str) {
        var pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return pattern.test(str);
    }
    const enteredGovernorateIsValid = filters.governorate.trim() !== 'المحافظة';
    const GovernorateInputIsInvalid = !enteredGovernorateIsValid && enteredGovernorateTouched;

    const enteredAgeFilterIsValid = filters.ageFilter.trim() !== 'فلترة العمر';
    const AgeFilterInputIsInvalid = !enteredAgeFilterIsValid && enteredAgeFilterTouched;

    const enteredDateFilterIsValid = filters.dateFilter.trim() !== 'فلترة التاريخ';
    const DateFilterInputIsInvalid = !enteredDateFilterIsValid && enteredDateFilterTouched;

    const enteredGenderIsValid = filters.gender.trim() !== 'الجنس';
    const GenderInputIsInvalid = !enteredGenderIsValid && enteredGenderTouched;


    const enteredNameIsValid = filters.nameDieses.trim() !== '' && !containsSpecialCharacters(filters.nameDieses);
    const NameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    const enteredAgeIsValid = filters.minAge > 0
    const AgeInputIsInvalid = !enteredAgeIsValid && enteredAgeTouched;

    const enteredAgeMaxIsValid = filters.maxAge > 0 && filters.maxAge > filters.minAge
    const AgeMaxInputIsInvalid = !enteredAgeMaxIsValid && enteredAgeMaxTouched;

    const enteredDateIsValid = filters.fromDate.trim() !== '';
    const DateInputIsInvalid = !enteredDateIsValid && enteredDateTouched;

    const enteredBigDateIsValid = filters.toDate.trim() !== '';
    const BigDateInputIsInvalid = !enteredBigDateIsValid && enteredBigDateTouched;


    let formIsValid = false;

    if (filters.ageFilter === '*') {
        if (filters.dateFilter === 'disable') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid) {
                formIsValid = true
            }
        }
        else if (filters.dateFilter === 'between') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredBigDateIsValid && enteredDateIsValid) {
                formIsValid = true
            }

        }
        else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredDateIsValid) {
                formIsValid = true
            }
        }
    }

    if (filters.ageFilter === 'between') {
        if (filters.dateFilter === 'disable') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredAgeMaxIsValid && enteredAgeIsValid) {
                formIsValid = true
            }
        }

        else if (filters.dateFilter === 'between') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredBigDateIsValid && enteredDateIsValid && enteredAgeMaxIsValid && enteredAgeIsValid) {
                formIsValid = true
            }

        }
        else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {
            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredDateIsValid && enteredAgeMaxIsValid && enteredAgeIsValid) {
                formIsValid = true
            }
        }
    }
    if ((filters.ageFilter === 'lt' || filters.ageFilter === 'gt' || filters.ageFilter === 'equal') && filters.ageFilter !== 'فلترة العمر') {

        if (filters.dateFilter === 'disable') {

            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredAgeIsValid) {
                formIsValid = true
            }
        }
        else if (filters.dateFilter === 'between') {

            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredBigDateIsValid && enteredDateIsValid && enteredAgeIsValid) {
                formIsValid = true
            }

        }
        else if ((filters.dateFilter === 'lt' || filters.dateFilter === 'gt' || filters.dateFilter === 'equal') && filters.dateFilter !== 'فلترة التاريخ') {

            if (enteredNameIsValid && enteredGovernorateIsValid && enteredGenderIsValid && enteredDateIsValid && enteredAgeIsValid) {
                formIsValid = true
            }
        }
    }






    const GovernorateInputBlurHandler = (event) => {
        setEnteredGovernorateTouched(true);
    };
    const AgeFilterInputBlurHandler = (event) => {
        setEnteredAgeFilterTouched(true);
    };
    const DateFilterInputBlurHandler = (event) => {
        setEnteredDateFilterTouched(true);
    };
    const GenderInputBlurHandler = (event) => {
        setEnteredGenderTouched(true);
    };
    const NameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
    };
    const AgeInputBlurHandler = (event) => {
        setEnteredAgeTouched(true);
    };
    const AgeMaxInputBlurHandler = (event) => {
        setEnteredAgeMaxTouched(true);
    };

    const DateInputBlurHandler = (event) => {
        setEnteredDateTouched(true);
    };
    const BigDateInputBlurHandler = (event) => {
        setEnteredBigDateTouched(true);
    };

    const configurationName = {
        type: 'text',
        label: 'اسم المرض'
    }

    const configurationAge = {
        type: 'number',
        label: 'العمر'
    }
    const configurationMinAge = {
        type: 'number',
        label: 'العمر الأصغر'
    }
    const configurationMaxAge = {
        type: 'number',
        label: 'العمر الأكبر'
    }
    const configurationDate = {
        type: 'date',
        label: `${filters.dateFilter === 'between' ? 'التاريخ الأصغر' : 'التاريخ'}`
    }
    const configurationBigDate = {
        type: 'date',
        label: 'التاريخ الأكبر'
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.Big_Container}>
                <div className={classes.image_container}>
                    <img src={reports} alt='reports' />
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>


                    <div className={classes.height}>
                        <MainInput
                            configuration={configurationName}
                            onChange={e => handleFilterChange('nameDieses', e.target.value)}
                            onBlur={NameInputBlurHandler}
                            value={filters.nameDieses}
                            isInvalid={NameInputIsInvalid}
                        />
                        {NameInputIsInvalid && <p className='error-text'> اسم المرض فارغ.</p>}
                    </div>


                    <div className={classes.height}>
                        <select
                            className={`${classes.select} ${GovernorateInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={e => handleFilterChange('governorate', e.target.value)}
                            onBlur={GovernorateInputBlurHandler}
                            value={filters.governorate}
                        >
                            <option className={classes.option} value='المحافظة' >المحافظة</option>
                            <option className={classes.option} value="*">الكل</option>
                            <option className={classes.option} value="Damascus">دمشق</option>
                            <option className={classes.option} value="rular-damascus">ريف دمشق</option>
                            <option className={classes.option} value="Latakia">اللاذقية</option>
                            <option className={classes.option} value="Tartus">طرطوس</option>
                            <option className={classes.option} value="Homs">حمص</option>
                            <option className={classes.option} value="Aleppo">حلب</option>
                            <option className={classes.option} value="Hama">حماة</option>
                            <option className={classes.option} value="Daraa">درعا</option>
                            <option className={classes.option} value="Idlib">إدلب</option>
                            <option className={classes.option} value="Raqqa"> الرقة</option>
                            <option className={classes.option} value="Hasakah">الحسكة</option>
                            <option className={classes.option} value="Deir ez-Zor">دير الزور</option>
                            <option className={classes.option} value="Quneitra">القنيطرة</option>
                            <option className={classes.option} value="Sweida">السويداء</option>


                        </select>
                        {GovernorateInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار المحافظة .</p>
                        )}
                    </div>

                    <div className={classes.height}>
                        <select
                            className={`${classes.select} ${GenderInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={e => handleFilterChange('gender', e.target.value)}
                            onBlur={GenderInputBlurHandler}
                            value={filters.gender}
                        >
                            <option className={classes.option} value='الجنس' >الجنس</option>
                            <option className={classes.option} value="*">الكل</option>
                            <option className={classes.option} value="male">ذكر</option>
                            <option className={classes.option} value="female">أنثى</option>



                        </select>
                        {GenderInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار  الجنس .</p>
                        )}
                    </div>


                    <div className={classes.age}>

                        {filters.ageFilter === 'between' && (

                            <>

                                <div className={classes.height}>
                                    <MainInput
                                        configuration={configurationMinAge}
                                        onChange={e => handleFilterChange('minAge', e.target.value)}
                                        onBlur={AgeInputBlurHandler}
                                        value={filters.minAge}
                                        isInvalid={AgeInputIsInvalid}
                                    />
                                    {AgeInputIsInvalid && <p className='error-text'> العمر فارغ أو أصغر من 0</p>}
                                </div>


                                <div className={classes.height}>
                                    <MainInput
                                        configuration={configurationMaxAge}
                                        onChange={e => handleFilterChange('maxAge', e.target.value)}
                                        onBlur={AgeMaxInputBlurHandler}
                                        value={filters.maxAge}
                                        isInvalid={AgeMaxInputIsInvalid}
                                    />
                                    {AgeMaxInputIsInvalid && <p className='error-text'>العمر فارغ أو أصغر من 0 أو أصغر من العمر الأصغر</p>}
                                </div>

                            </  >
                        )}

                        {filters.ageFilter !== 'between' && (
                            <div className={`${classes.height} ${filters.ageFilter === '*' || filters.ageFilter === 'فلترة العمر' ? classes.disabled : ''}`}>
                                <MainInput
                                    configuration={configurationAge}
                                    onChange={e => handleFilterChange('minAge', e.target.value)}
                                    onBlur={AgeInputBlurHandler}
                                    value={filters.minAge}
                                    isInvalid={AgeInputIsInvalid}
                                />
                                {AgeInputIsInvalid && <p className='error-text'> العمر فارغ أو أصغر من 0</p>}
                            </div>

                        )}
                        <div className={classes.height}>
                            <select
                                className={`${classes.select} ${AgeFilterInputIsInvalid ? classes.invalid : ''} `}
                                required
                                onChange={e => handleFilterChange('ageFilter', e.target.value)}
                                onBlur={AgeFilterInputBlurHandler}
                                value={filters.ageFilter}
                            >
                                <option className={classes.option} value='فلترة العمر' >فلترة العمر</option>
                                <option className={classes.option} value="*">كل الأعمار</option>
                                <option className={classes.option} value="lt">أقل من العمر المدخل</option>
                                <option className={classes.option} value="gt">أكبر من العمر المدخل</option>
                                <option className={classes.option} value="equal"> يساوي العمر المدخل</option>
                                <option className={classes.option} value="between"> بين عمرين</option>



                            </select>
                            {/* {AgeFilterInputIsInvalid && (
                                <p className='error-text'>الرجاء اختيار فلترة للعمر .</p>
                            )} */}
                        </div>


                    </div>

                    <div className={classes.date}>


                        <div className={`${classes.height} ${filters.dateFilter === 'disable' || filters.dateFilter === 'فلترة التاريخ' ? classes.disabled : ''}`}>
                            <MainInput
                                configuration={configurationDate}
                                onChange={e => handleFilterChange('fromDate', e.target.value)}
                                onBlur={DateInputBlurHandler}
                                value={filters.fromDate}
                                isInvalid={DateInputIsInvalid}
                            />
                            {DateInputIsInvalid && <p className='error-text'>التاريخ  فارغ.</p>}
                        </div>

                        {filters.dateFilter === 'between' && (

                            <div className={classes.height}>
                                <MainInput
                                    configuration={configurationBigDate}
                                    onChange={e => handleFilterChange('toDate', e.target.value)}
                                    onBlur={BigDateInputBlurHandler}
                                    value={filters.toDate}
                                    isInvalid={BigDateInputIsInvalid}
                                />
                                {BigDateInputIsInvalid && <p className='error-text'>التاريخ  فارغ.</p>}
                            </div>
                        )}

                        <div className={classes.height}>
                            <select
                                className={`${classes.select} ${DateFilterInputIsInvalid ? classes.invalid : ''} `}
                                required
                                onChange={e => handleFilterChange('dateFilter', e.target.value)}
                                onBlur={DateFilterInputBlurHandler}
                                value={filters.dateFilter}
                            >
                                <option className={classes.option} value='فلترة التاريخ' >فلترة التاريخ</option>
                                <option className={classes.option} value="lt">أقل من التاريخ المدخل</option>
                                <option className={classes.option} value="gt">أكبر من التاريخ المدخل</option>
                                <option className={classes.option} value="equal"> يساوي التاريخ المدخل</option>
                                <option className={classes.option} value="between"> بين تاريخيين </option>
                                <option className={classes.option} value="disable">تعطيل التاريخ</option>



                            </select>
                            {/* {DateFilterInputIsInvalid && (
                                <p className='error-text'>الرجاء اختيار فلترة للتاريخ .</p>
                            )} */}
                        </div>

                    </div>








                    <button disabled={!formIsValid} className={classes.button} type="submit"> تجهيز التقرير</button>
                </form>
            </div>

            {info.length > 0 && (isHasDate === true || isHasDate === false) && <div className={classes.reports}>
                
                {isHasDate===true && info.length > 0 && <ChartWithDate data={info} />}
                {isHasDate===false && info.length > 0 && <ChartWithoutDate data={info} />}
                {info.length === 0 && <p>لا يوجد بيانات</p>}
            </div>}

            <ToastContainer />
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>

    )
}

