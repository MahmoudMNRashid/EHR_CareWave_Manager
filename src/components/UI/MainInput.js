import React, { useState } from 'react'
import classes from './Main_Input.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const MainInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = props.configuration.type === 'password' && !showPassword
    ? 'text'
    : props.configuration.type;
  const inputClasses = `${classes.input} ${props.in ? classes.hasValueInput : ''}`;
  const labelClasses = `${classes.userlabel} ${props.la ? classes.hasValue : ''}`;
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={classes.inputgroup}>
      <input
        style={props.style}
        required
        type={inputType}
         className={` ${inputClasses}  ${props.isInvalid ? classes.invalid : ''}` }
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
        min={0}

      />
      {props.configuration.type === 'password' && (
        <button
          className={classes.toggleButton}
          onClick={handleTogglePassword}
          type="button"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
            style={{ color: '#000 ' }}

          />
        </button>
      )}
      <label className={`${props.configuration.type === 'date' ? classes.a : ''} ${labelClasses}`}>{props.configuration.label}</label>
    </div>
  )
}

