import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { inputBase, inputStates, labelStyle, errorStyle } from '../Input/styles';

export interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  value?: number | string;
  onChange?: (value: number) => void;
}

function formatDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  return (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function CurrencyInput({
  label,
  error,
  value,
  onChange,
  className = '',
  id,
  ...rest
}: CurrencyInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  const toDisplay = (v: number | string | undefined) => {
    if (v === undefined || v === '' || v === 0) return '';
    const num = typeof v === 'string' ? parseFloat(v) : v;
    if (isNaN(num)) return '';
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const [display, setDisplay] = useState(() => toDisplay(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDisplay(e.target.value);
    setDisplay(formatted);
    const numeric = parseFloat(formatted.replace(/\./g, '').replace(',', '.')) || 0;
    onChange?.(numeric);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className={labelStyle}>
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9e8b78] pointer-events-none select-none">
          R$
        </span>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          placeholder="0,00"
          {...rest}
          className={`${inputBase} ${error ? inputStates.error : inputStates.default} pl-10 ${className}`}
        />
      </div>
      {error && <span className={errorStyle}>{error}</span>}
    </div>
  );
}