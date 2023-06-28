import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigation } from 'react-router-dom'
import { Sidebar } from '../../components/UI/Sidebar'
import { Nav } from '../../components/UI/Nav'
import classes from './RootLayoutManager.module.css'
import LoadingBar from 'react-top-loading-bar'
import { faUsers, faRightFromBracket, faChartSimple, faUserXmark, faCommentMedical, faMagnifyingGlass, faCircleExclamation, faUserPlus } from '@fortawesome/free-solid-svg-icons';


export const RootLayoutManager = () => {
  const navigation = useNavigation();

  const np = [
    {
      name: ' إضافة مساعد جديد',
      path: "NewAssistant",
      icon: faUserPlus

    },
    {
      name: 'مساعديين مدير النظام',
      path: "Assistants",
      icon: faUsers
    },
    {
      name: 'شكاوي',
      path: "Complaints",
      icon: faCircleExclamation
    },
    {
      name: 'البحث عن طبيب عن طريق الأسم',
      path: "DoctorsSearchName",
      icon: faMagnifyingGlass

    },
    {
      name: 'البحث عن طبيب عن طريق الرقم الوطني',
      path: "DoctorSearchIdSyr",
      icon: faMagnifyingGlass
    },
    {
      name: 'البحث عن طبيب عن طريق الرقم الطبي',
      path: "DoctorSearchIdMedical",
      icon: faMagnifyingGlass
    },
    {
      name: ' النصائح الطبية',
      path: "MedicalTips",
      icon: faCommentMedical
    },
    {
      name: 'البحث عن مريض عن طريق الرقم الوطني',
      path: "PatientSearchIdSyr",
      icon: faMagnifyingGlass
    },
    {
      name: 'حذف حساب فئة طبية',
      path: "DeleteAccountDoctor",
      icon: faUserXmark
    },
    {
      name: 'التقارير',
      path: "Reports",
      icon: faChartSimple
    },
    {
      name: 'تسجيل الخروج',
      path: "../../logout",
      icon: faRightFromBracket
    }
  ]

  const svgPartOne = [
    {
      icon: faUserPlus,
      explanation: 'اضف مساعد جديد',
      path: 'NewAssistant'
    },
    {
      explanation: 'مساعديين مدير النظام',
      path: "Assistants",
      icon: faUsers
    },
    {
      icon: faCircleExclamation,
      explanation: 'الشكاوي',
      path: 'Complaints'
    },
    {
      icon: faMagnifyingGlass,
      explanation: 'البحث عن طبيب عن طريق الاسم',
      path: 'DoctorsSearchName'
    },
    {
      icon: faMagnifyingGlass,
      explanation: 'البحث عن طبيب عن طريق الرقم الوطني',
      path: 'DoctorSearchIdSyr'
    },
    {
      icon: faMagnifyingGlass,
      explanation: 'البحث عن طبيب عن طريق الرقم الطبي',
      path: 'DoctorSearchIdMedical'
    },



  ]

  const svgPartTwo = [

   
    {
      icon: faCommentMedical,
      explanation: 'النصائح الطبية',
      path: 'MedicalTips'
    },
    {
      icon: faMagnifyingGlass,
      explanation: 'البحث عن مريض عن طريق الرقم الوطني',
      path: 'PatientSearchIdSyr'
    },
    {
      icon: faUserXmark,
      explanation: 'حذف حساب فئة طبية',
      path: 'DeleteAccountDoctor'
    },
    {
      icon: faChartSimple,
      explanation: 'التقارير',
      path: 'Reports'
    },
    {
      icon: faRightFromBracket,
      explanation: 'تسجيل الخروج',
      path: '../../logout'
    },
  ]

  return (

    <Container style={{ padding: '0px', }} fluid >
      <Row className={classes.row} >
        <Col sm="2" xs="2" md="2" className={classes.col1}>
          <Nav svgPartOne={svgPartOne} svgPartTwo={svgPartTwo} className={classes.minisidebar} />
          <Sidebar np={np} className={classes.bigsidebar} />
        </Col>
        <Col sm="10" xs="10" md="10" className={classes.col2}>
          <Outlet />

        </Col>
      </Row>
      {
        navigation.state === 'loading' && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
      }
    </Container>


  )
}
