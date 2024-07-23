import React from 'react'
import classes from './Main_Details_Information_EHR.module.css'
import { json, redirect, useLoaderData } from 'react-router-dom'
import { getToken } from '../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'
import ehr from '../../style/42332040.jpg'
import { Helmet } from 'react-helmet'
import { MainInformationPatientCard } from '../../components/Manager/EHR/Main_Details_Information_EHR/MainInformationPatient/MainInformationPatientCard'
import { ChronicDiseasesCard } from '../../components/Manager/EHR/Main_Details_Information_EHR/Chronic/ChronicDiseasesCard'
import { GeneticDiseasesCard } from '../../components/Manager/EHR/Main_Details_Information_EHR/Genetic/GeneticDiseasesCard'
import { MainDiagnosesCard1 } from '../../components/Manager/EHR/Main_Details_Information_EHR/MainDiagnoses/MainDiagnosesCard1'
import { VaccinesDiseasesCard } from '../../components/Manager/EHR/Main_Details_Information_EHR/Vaccines/VaccinesDiseasesCard'
import { AllergicDiseasesCard } from '../../components/Manager/EHR/Main_Details_Information_EHR/Allergic/AllergicDiseasesCard'

export const MainDetailsInformationEHR = () => {
    // _____________________
    const BigData = useLoaderData()
    console.log('bigdata', BigData)

    const currentYear = new Date().getFullYear();
    const yearOfBirth = currentYear - BigData.patientInformation.age;
    const mainPatient = {
        idPatient: BigData.patientInformation.id,
        name: BigData.patientInformation.name,
        age: BigData.patientInformation.age,
        year: yearOfBirth,
        bloodType: BigData.patientInformation.bloodGroup,
        address: BigData.patientInformation.address,
        phone: BigData.patientInformation.phone,
        governorate: BigData.patientInformation.governorate
    }
    // __________________________
    const chronic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.chronicDiseases
    }

    const genetic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.geneticDiseases

    }

    const allergic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.drugAllergy
    }

    const vaccines = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        vaccines:
            BigData.patientInformation.vaccinesEntity
    }
    // __________________________


    const diagnoses = BigData.mainDiagnoses
    const idSyr = BigData.idSyr
    const idPatient = BigData.patientInformation.id
    // __________________________

    return (
        <div className={classes.ThePage}>
            <Helmet>
                <title>السجل الصحي</title> </Helmet>
            <div className={classes.Bigwrapper}>
                <div className={classes.FirstWrapper}>
                    <MainInformationPatientCard info={mainPatient} />
                    <img style={{ width: '400px', height: '300px' }} src={ehr} alt='' />
                </div>
                <div className={classes.MiddleWrapper}>
                    <ChronicDiseasesCard info={chronic} />
                    <GeneticDiseasesCard info={genetic} />
                    <AllergicDiseasesCard info={allergic} />
                    <VaccinesDiseasesCard info={vaccines} />
                </div>
                <div className={classes.ThirdWrapper}>

                    <MainDiagnosesCard1 info={diagnoses} idSyr={idSyr} idPatient={idPatient} />

                </div>
                <ToastContainer />
            </div>
        </div>


    )
}

export const api = async ({ params }) => {
    try {
        const response = await fetch(`http://localhost:8000/v1/HelpMedical/getinfosick/${params.IdSyr}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()}`

            },
        })

        if (!response.ok) {
            const data = await response.json()
            console.log(data.message)
            if (data.message === `Can't found account.`) {
                throw new Error('error')
            }
            else {
                throw new Error('server')
            }

        }

        const data = await response.json()


        const response1 = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/${params.IdSyr}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()}`

            },
        })
        console.log(response1)
        if (!response1.ok) {

            throw new Error('server')
        }
        const data1 = await response1.json()



        const ALLData = {
            idSyr: params.IdSyr,
            patientInformation: data.data, /* objects*/
            mainDiagnoses: data1.data.data /* مصفوفة objects */
        }

        return ALLData






        // return BigData

    } catch (error) {
        if (error.message === `error`) {
            // toast.warning('الرقم الوطني غير موجود', {
            //     position: "top-right",
            //     autoClose: 1000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // })
            // return redirect('/DashboardDoctor/HealthRecord')
            throw new Error('الرقم الوطني غير موجود')
        } else if (error.message === `server`) {
            throw new Error('server')
        }
        else {
            toast.error('حدث خطأ ما', {
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










}




