import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigation } from 'react-router-dom'
import classes from './RootLayoutAsst.module.css'
import { Sidebar } from '../../components/UI/Sidebar'
import { Nav } from '../../components/UI/Nav'
import LoadingBar from 'react-top-loading-bar'
import { faAdd, faKey, faLevelUp, faMagnifyingGlass, faRightFromBracket, faShieldAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons'


export const RootLayoutAsst = () => {
    const navigation = useNavigation();
    const svgPartOne = [
        {
            icon: faUserCheck,
            explanation: 'تأكيد حساب فئة طبية',
            path: 'VerifyDoctorAccount'
        },



        {
            icon: faLevelUp,
            explanation: 'تطوير حساب',
            path: 'UpgradeAccount'
        },
        {
            icon: faMagnifyingGlass,
            explanation: 'البحث عن مريض عن طريق الرقم الوطني',
            path: 'PatientSearchIdSyr'
        },
        {
            icon: faKey,
            explanation: 'تغيير كلمة المرور',
            path: 'ChangePassword'
        },

        {
            explanation: 'تغيير كلمة مرور ورقم جوال فئة طبية',
            path: 'ChangePhoneAndPassword',
            icon: faShieldAlt
        },
        {

            explanation:'إضافة مرض جديد',
            path:'AddNewDisease',
            icon:faAdd

        },
        {

            explanation:'إضافة تخصص جديد',
            path:'AddNewSpecialization',
            icon:faAdd

        },
        {
            icon: faRightFromBracket,
            explanation: 'تسجيل الخروج',
            path: '../../logout'
        },
    ]


    const np = [
        {
            name: 'تأكيد حساب فئة طبية',
            path: 'VerifyDoctorAccount',
            icon: faUserCheck


        },
        {
            name: ' ترقية حساب مريض',
            path: 'UpgradeAccount',
            icon: faLevelUp

        },
        {
            name: 'البحث عن مريض عن طريق الرقم الوطني',
            path: "PatientSearchIdSyr",
            icon: faMagnifyingGlass
        },
        {
            name: 'تغيير كلمة مرور فئة طبية',
            path: 'ChangePassword',
            icon: faKey
        },
        {
            name: 'تغيير كلمة مرور ورقم جوال فئة طبية',
            path: 'ChangePhoneAndPassword',
            icon: faShieldAlt
        },

        {
            name:'إضافة مرض جديد',
            path:'AddNewDisease',
            icon:faAdd

        },
        {

            name:'إضافة تخصص جديد',
            path:'AddNewSpecialization',
            icon:faAdd

        },
        // {
        //     name: 'test',
        //     path: 'test'
        // },
        {
            name: 'تسجيل الخروج',
            path: '../../logout',
            icon: faRightFromBracket
        },

    ]
    return (
        <Container style={{ padding: '0px' }} fluid >
            <Row className={classes.row} >
                <Col sm="2" xs="2" md="2" className={classes.col1}>
                    <Nav svgPartOne={svgPartOne} className={classes.minisidebar} />
                    <Sidebar np={np} className={classes.bigsidebar} />
                </Col>
                <Col  sm="10" xs="10" md="10" className={classes.col2}>
                    <Outlet  />
                   
                </Col>
            </Row>
            {
                navigation.state === 'loading' && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </Container>
    )
}