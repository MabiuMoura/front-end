import React from 'react';
import { UseFormRegisterReturn, FieldError, FieldErrors } from 'react-hook-form';
import * as S from './styles';
import InputMask from 'react-input-mask';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Partial<FieldErrors>;
  placeholder?: string;
  mask?: string; 
}

export const InputRegister: React.FC<InputProps> = ({ 
  label, 
  register, 
  error, 
  placeholder, 
  type = 'text', 
  mask,
  disabled,
  ...rest 
}) => {
  const isFieldError = (error: any): error is FieldError => {
    return error && typeof error.message === 'string';
  };

  return (
    <S.FormField>
      <label>{label}</label>
      {mask ? (
        <InputMask
          mask={mask}
          maskChar=""
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          {...rest}
        >
          {(inputProps) => (
            <S.Input {...inputProps}  disabled={disabled}/>
          )}
        </InputMask>
      ) : (
        <S.Input 
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
          {...rest}
        />
      )}
      {isFieldError(error) && (
        <S.ErrorMessage>
          {error.message}
        </S.ErrorMessage>
      )}
    </S.FormField>
  );
};