import { InputHTMLAttributes, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isPassword?: boolean;
  readOnly?: boolean;
  mask?: string;
  formatMask?: Function;
}

export function Input({
  name,
  mask,
  formatMask,
  isPassword,
  readOnly = false,
  ...props
}: InputProps) {
  const { register, watch, setValue } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const inputValue = formatMask && watch(name);

  useEffect(() => {
    if (formatMask) {
      setValue(name, formatMask(inputValue));
    }
  }, [inputValue]);

  return (
    <SContainer>
      <SInput
        id={name}
        readOnly={readOnly}
        {...register(name)}
        {...props}
        autoComplete='auto'
        maxLength={mask?.length}
        type={
          props.type === "password"
            ? isPassword && !showPassword
              ? "password"
              : "text"
            : props.type
            ? props.type
            : "text"
        }
      />
      {isPassword ? (
        <i>
          {showPassword ? (
            <SAiFillEyeInvisible
              onClick={(_e: any) => setShowPassword(!showPassword)}
            />
          ) : (
            <SAiFillEye onClick={(_e: any) => setShowPassword(!showPassword)} />
          )}
        </i>
      ) : (
        <i></i>
      )}
    </SContainer>
  );
}

export const SContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 5px;
  i {
    position: absolute;
    top: 45%;
    right: 15px;

    @media (max-width: px) {
      top: 45%;
      right: 15px;
    }
  }
  i:hover {
    cursor: pointer;
  }
`;

export const SInput = styled.input`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.neutral_colors.white};
  background-color: ${(props) => props.theme.colors.primary_colors.gray};
  border: 0.2px solid ${(props) => props.theme.colors.primary_colors.gray100};
  padding: 20px;
  width: 30rem;
  height: 4rem;
  font-size: 13px;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: ${device.tablet}) {
    width: 60vw;
    height: 3.5rem;
  }

  @media (max-width:543px) {
    width: 53vw;
    height: 2.5rem;
    font-size: 10px;
  }

  @media (max-width:${device.mobileSmall}) {
    width: 12rem;
    height: 2.5rem;
    font-size: 10px;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.colors.neutral_colors.white} !important;
    box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.primary_colors.gray} inset; 
    caret-color: ${(props) => props.theme.colors.neutral_colors.white}; 
    border: 0.2px solid ${(props) => props.theme.colors.primary_colors.gray100}; 
  }

  &:-moz-autofill {
    color: ${(props) => props.theme.colors.neutral_colors.white};
    box-shadow: 0 8px 8px 1000px ${(props) => props.theme.colors.primary_colors.gray} inset; 
    caret-color: ${(props) => props.theme.colors.neutral_colors.white}; 
  }
`;

export const SAiFillEyeInvisible = styled(AiFillEyeInvisible)`
  color: ${(props) => props.theme.colors.neutral_colors.white};
  font-size: 1.15rem;

  @media (max-width: 543px) {
    font-size: 1rem;
  }
`;

export const SAiFillEye = styled(AiFillEye)`
  color: ${(props) => props.theme.colors.neutral_colors.white};
  font-size: 1.15rem;

  @media (max-width: 543px) {
    font-size: 1rem;
  }
`;
