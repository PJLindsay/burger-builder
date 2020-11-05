import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputStyles = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid)
  }

  switch(props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputStyles.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break;

    case ('textarea'):
      inputElement = <textarea
        className={inputStyles}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break;

    case ('select'):
      inputElement =
      <select
        className={inputStyles}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option
            key={option.value}
            value={option.value}
            onChange={props.changed}
          >
            {option.displayValue}
          </option>
        ))}
      </select>
      break;

    default:
      inputElement = <input
        className={styles.InputElement}
        {...props.elementConfig}
        value = {props.value}
        onChange={props.changed}
      />
      break;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
};

export default input;