import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { inputBase, inputStates, labelStyle, errorStyle } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className={labelStyle}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          {...rest}
          className={`${inputBase} ${error ? inputStates.error : inputStates.default} ${className}`}
        />
        {error && <span className={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';