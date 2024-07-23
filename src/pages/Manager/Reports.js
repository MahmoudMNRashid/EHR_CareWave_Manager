import React, { useState } from 'react'
import { ReportsComponent } from '../../components/Asst_Manger/Reports_Function/Reports'
import { Helmet } from 'react-helmet'
export const Reports = () => {
  



  return (
    <>
                <Helmet><title> التقارير</title></Helmet>

    <ReportsComponent/>
    </>
    )
}



// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(fas);
//   const icons = Object.keys(fas).map((iconName, index) => (
//     <div key={index}>
//       <FontAwesomeIcon icon={fas[iconName]} /> {iconName}
//     </div>
//   ));