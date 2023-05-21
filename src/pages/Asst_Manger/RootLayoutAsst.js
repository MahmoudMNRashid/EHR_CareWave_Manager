import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import classes from './RootLayoutAsst.module.css'
import { Sidebar } from '../../components/UI/Sidebar'
import { Nav } from '../../components/UI/Nav'

export const RootLayoutAsst = () => {

 


    const np = [
        {
            name: 'تأكيد حساب طبيب',
            path: 'VerifyDoctorAccount'
        },
        {
            name: 'تطوير حساب',
            path: 'UpgradeAccount'

        },
        {
            name: 'حذف حساب طبيب',
            path: 'DeleteDoctorAccount',
        },
        {
            name: 'تغيير رقم الموبايل',
            path: 'ChangePass'
        },
        {
            name: 'تسجيل الخروج',
            path:'/'
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
