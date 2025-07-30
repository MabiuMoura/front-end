import React, { InputHTMLAttributes } from "react";
import * as S from "./styles";

interface InputModalProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  mask?: "cpf" | "none";
  width?: string;
  height?: string;
  multiline?: boolean;
}

const InputModal: React.FC<InputModalProps> = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  error,
  mask = "none",
  width,
  height,
  multiline = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!onChange) return;

    let newValue = e.target.value;

    if (mask === "cpf" && !multiline) {
      newValue = newValue.replace(/\D/g, "");
      newValue = newValue.slice(0, 11);

      if (newValue.length <= 11) {
        newValue = newValue.replace(
          /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
          (_, g1, g2, g3, g4) => {
            let result = g1;
            if (g2) result += `.${g2}`;
            if (g3) result += `.${g3}`;
            if (g4) result += `-${g4}`;
            return result;
          }
        );
      }
    }

    const maskedEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };

    onChange(maskedEvent);
  };

  return (
    <S.ModalContainer>
      <S.Label>{label}</S.Label>
      {multiline ? (
        <S.TextArea
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          width={width}
          height={height}
          onKeyDown={onKeyDown}
        />
      ) : (
        <S.Input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={mask === "cpf" ? 14 : undefined}
          width={width}
          height={height}
          onKeyDown={onKeyDown}
        />
      )}
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.ModalContainer>
  );
};

export default InputModal;