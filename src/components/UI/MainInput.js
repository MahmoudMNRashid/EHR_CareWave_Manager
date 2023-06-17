import React, { useState } from 'react'
import classes from './Main_Input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const MainInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = props.configuration.type === 'password' && !showPassword ? 'password' : 'text';

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
    return (
<div className={classes.inputgroup}>
  <input
  required
    type={inputType} className={`${classes.input}  ${props.isInvalid ? classes.invalid : ''}`
   }
    onBlur={props.onBlur}
    onChange={props.onChange}
    value={props.value}
  />
  {props.configuration.type === 'password' && (
        <button
          className={classes.toggleButton}
          onClick={handleTogglePassword}
          type="button"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
          style={{ color: '#4f7bb8' }}
          
          />  
        </button>
      )}
  <label className={ classes.userlabel}>{props.configuration.label}</label>
</div>
    )
}

