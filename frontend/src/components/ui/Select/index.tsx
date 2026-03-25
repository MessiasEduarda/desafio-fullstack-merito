import { forwardRef, useState, useRef, useEffect } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { selectBase, selectStates, labelStyle, errorStyle } from './styles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder = 'Selecione...', className = '', id, onChange, value, defaultValue, ...rest },
    ref
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(
      (value as string) ?? (defaultValue as string) ?? ''
    );
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
      options.find((o) => o.value === selected)?.label ?? placeholder;

    useEffect(() => {
      if (value !== undefined) setSelected(value as string);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optValue: string) => {
      setSelected(optValue);
      setIsOpen(false);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype, 'value'
      )?.set;
      if (hiddenRef.current && nativeInputValueSetter) {
        nativeInputValueSetter.call(hiddenRef.current, optValue);
        hiddenRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    const hiddenRef = useRef<HTMLSelectElement>(null);

    return (
      <div className="flex flex-col gap-1" ref={containerRef}>
        {label && (
          <label htmlFor={selectId} className={labelStyle}>
            {label}
          </label>
        )}

        <select
          ref={(node) => {
            (hiddenRef as React.MutableRefObject<HTMLSelectElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
          }}
          id={selectId}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            onChange?.(e);
          }}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`
              ${selectBase}
              ${error ? selectStates.error : selectStates.default}
              ${className}
              flex items-center justify-between pr-4 text-left
              ${selected ? 'text-[#3d2f22]' : 'text-[#c4b4a4]'}
            `}
          >
            <span className="truncate">{selectedLabel}</span>
            <span
              className={`ml-2 text-[#a8906f] text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <ul
              className="
                absolute z-50 w-full mt-2
                bg-white border border-[#e8ddd0]
                rounded-[20px] shadow-lg
                overflow-hidden
                animate-in fade-in slide-in-from-top-1 duration-150
              "
            >
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`
                      w-full text-left px-5 py-2.5 text-sm transition-colors duration-100
                      ${opt.value === selected
                        ? 'bg-[#a8906f]/10 text-[#a8906f] font-medium'
                        : 'text-[#5c4a38] hover:bg-[#faf7f4]'
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <span className={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';