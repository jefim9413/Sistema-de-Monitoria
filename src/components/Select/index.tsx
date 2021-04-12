import React, {SelectHTMLAttributes} from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{value:string, label: string}>;
}

const Select: React.FC<SelectProps> =  ({label, name, options, ...rest}) => {
  return (
    <>
      <div className="select-block">
        <label htmlFor={name}> {label} </label>
        <select value=""  id={name} {...rest}>
          <option  disabled hidden value="">Selecione um opção</option>
          {options.map((op) => {
            return (
              <option key={op.value} value={op.value}>{op.label}</option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default Select;