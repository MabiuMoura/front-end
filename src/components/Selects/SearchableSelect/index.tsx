import React, { useState, useEffect, useRef } from 'react';
import { UseFormRegisterReturn, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import * as S from './styles';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  placeholder?: string;
  options: Option[];
}

export const SearchableSelectRegister: React.FC<SelectProps> = ({
  label,
  register,
  error,
  placeholder = "Selecione uma opção...",
  options,
}) => {
  const isFieldError = (error: any): error is FieldError => {
    return error && typeof error.message === 'string';
  };
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
  
    const event = {
      target: {
        name: register.name, 
        value: option.value, 
      },
    };
  
    register.onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
  };


  return (
    <S.FormField ref={wrapperRef}>
      {label && <S.Label>{label}</S.Label>}
      <S.SelectContainer>
        <S.SelectInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
          hasError={!!error}
        />

        <input
          type="hidden"
          {...register}
          value={selectedOption?.value || ''}
        />

        <S.ArrowIcon isOpen={isOpen}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </S.ArrowIcon>

        {isOpen && (
          <S.OptionsContainer>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <S.Option
                  key={option.value}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </S.Option>
              ))
            ) : (
              <S.NoOptions>Opção não encontrada</S.NoOptions>
            )}
          </S.OptionsContainer>
        )}
      </S.SelectContainer>
      {isFieldError(error) && (
        <S.ErrorMessage>
          {error.message}
        </S.ErrorMessage>
      )}
    </S.FormField>
  );
};