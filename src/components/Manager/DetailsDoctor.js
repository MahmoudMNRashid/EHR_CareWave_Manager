import React from 'react'
import classes from './DetailsDoctor.module.css'
import circle from '../../style/28886101.jpg'
export const DetailsDoctor = (props) => {
    console.log(props.data)
    return (

        <div className={classes['card']}>
            <div className={classes['card-top-part']}>
                <div className={classes['left-part']}>
                    <div className={classes['user-name']}>
                        <p className={classes['name']}>{props.data.name}</p>

                    </div>
                    <div className={classes['user-position']}>
                        <p className={classes['position']}>
                            {`اختصاص:  ${props.data.specialization}`}
                        </p>
                    </div>
                </div>
                <div className={classes['right-part']}>
                    <div className={classes['user-photo']}>
                        <img src={circle} alt='_' className={classes['photo']} />
                    </div>
                </div>
            </div>
            <div className={classes['card-bottom-part']}>
                <div className={classes['bottom-part']}>
                    <div href="mailto: example@example.com" className={classes['link']}>
                        <span className={classes['icon']}>
                            <svg style={{ fontWeight: 'lighter' }} fill="whitesmoke" height="20" width="20" version="1.1" id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"

                                viewBox="0 0 487.951 487.951" >
                                <g id="SVGRepo_bgCarrier"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <g> <g>
                                    <path transform="translate(1.869 1.875)" d="M487.9,415.676v-344.4c0-20.8-16.6-37.5-37.5-37.5h-413c-20.7,0-37.4,16.7-37.4,37.5v345.4c0,20.8,16.6,37.5,37.5,37.5 h414.1C472.3,454.176,489,437.476,487.9,415.676z M448.4,413.576H40.6v-339.2h407.8V413.576z"></path>
                                    <path transform="translate(1.869 1.875)" d="M96.8,357.376h128c10.4,0,19.8-8.3,19.8-19.8v-187.2c0-11.4-9.4-20.8-20.8-20.8h-127c-11.4,0-20.8,9.4-20.8,20.8v186.2 C76,347.976,85.3,357.376,96.8,357.376z M117.6,171.176h86.3v145.6h-86.3V171.176z"></path>
                                    <path transform="translate(1.869 1.875)" d="M295.5,194.076h96.8c11.4,0,20.8-9.4,20.8-20.8s-9.4-20.8-20.8-20.8h-96.8c-11.4,0-20.8,9.4-20.8,20.8 S284,194.076,295.5,194.076z"></path>
                                    <path transform="translate(1.869 1.875)" d="M290.3,335.576H387c11.4,0,20.8-9.4,20.8-20.8s-9.4-20.8-20.8-20.8h-96.8c-11.4,0-20.8,9.4-20.8,20.8 S278.8,335.576,290.3,335.576z"></path>
                                </g> </g> </g></svg>
                        </span>
                        {`#${props.data.medicalid}`}
                    </div>
                </div>
                <div className={classes['bottom-part']}>
                    <div href="tel: 0123456789" className={classes['link']}>
                        <span className={classes['icon']}>
                            <svg fill="whitesmoke" viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                <path transform="translate(1.869 1.875)" d="M14.381,16.25h-.106C2,15.544.249,5.179.006,2.019A1.874,1.874,0,0,1,1.731,0H5.175A1.243,1.243,0,0,1,6.337.787l.95,2.337a1.247,1.247,0,0,1-.275,1.35L5.681,5.818a5.875,5.875,0,0,0,4.738,4.75l1.356-1.344a1.25,1.25,0,0,1,1.356-.257l2.356.944a1.245,1.245,0,0,1,.769,1.163v3.3A1.877,1.877,0,0,1,14.381,16.25Zm-12.5-15a.625.625,0,0,0-.625.625v.05C1.545,5.648,3.4,14.375,14.343,15h.038a.625.625,0,0,0,.625-.589V11.075l-2.356-.944-1.794,1.781-.3-.038A6.733,6.733,0,0,1,5.429,8.553,8.171,8.171,0,0,1,4.381,5.7l-.038-.3L6.118,3.606,5.181,1.25Z" id="Fill"></path>
                            </svg>
                        </span>
                        {props.data.phone}
                    </div>
                </div>
            </div>
        </div>
    )
}
