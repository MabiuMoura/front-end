import React from "react";
import * as S from "./styles";

interface InputModalCreateProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  width?: string;
  height?: string;
  marginBottom?: string;
}

const InputModalCreate: React.FC<InputModalCreateProps> = ({
  label,
  value,
  onChange,
  error,
  width,
  height,
  marginBottom,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <S.ModalContainer marginBottom={marginBottom}>
      <S.Label>{label}</S.Label>
      <S.Input
        value={value}
        onChange={handleChange}
        width={width}
        height={height}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.ModalContainer>
  );
};

export default InputModalCreate;
