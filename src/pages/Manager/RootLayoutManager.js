import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/UI/Sidebar'
import { Nav } from '../../components/UI/Nav'
import classes from './RootLayoutManager.module.css'

export const RootLayoutManager = () => {


  const np = [
    {
      name: ' إضافة مساعد جديد',
      path: "NewAssistant"
    },
    {
      name: 'شكاوي',
      path: "Complaints"

    },
    {
      name: 'البحث عن اطباء عن طريق الأسم',
      path: "DoctorsSearchName"
    },
    {
      name: 'البحث عن طبيب عن طريق الرقم الوطني',
      path: "DoctorSearchIdSyr"
    },
    {
      name: ' النصائح الطبية',
      path: "MedicalTips"
    },
    {
      name: 'التقارير',
      path: "Reports"
    },
    {
      name: 'تسجيل الخروج',
      path: "/"
    }
  ]
  return (

    <Container style={{ padding: '0px', }} fluid >
      <Row className={classes.row} >
        <Col sm="2" xs="2" md="2" className={classes.col1}>
          <Nav className={classes.minisidebar} />
          <Sidebar np={np} className={classes.bigsidebar} />
        </Col>
        <Col sm="10" xs="10" md="10" className={classes.col2}>
          <Outlet />
        </Col>
      </Row>
    </Container>


  )
}
