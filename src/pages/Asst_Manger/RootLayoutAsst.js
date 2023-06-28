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
            name: 'test',
            path: 'test'
        },
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
                    <svg
                        className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#31af99" fillOpacity="1" d="M0,64L34.3,90.7C68.6,117,137,171,206,202.7C274.3,235,343,245,411,208C480,171,549,85,617,85.3C685.7,85,754,171,823,176C891.4,181,960,107,1029,69.3C1097.1,32,1166,32,1234,48C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                    </svg>
                </Col>
            </Row>
            {
                navigation.state === 'loading' && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </Container>
    )
}