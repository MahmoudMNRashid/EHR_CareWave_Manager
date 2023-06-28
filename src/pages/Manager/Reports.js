import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
export const Reports = () => {
  library.add(fas);
  const icons = Object.keys(fas).map((iconName, index) => (
    <div key={index}>
      <FontAwesomeIcon icon={fas[iconName]} /> {iconName}
    </div>
  ));
  return (
    <div style={{ backgroundColor: 'white' }}>{icons}</div>
  )
}
