import React, { useState } from "react";
import * as S from "./styles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onOptionSelect: (option: string) => void;
  placeholder?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  placeholder = "Selecione uma opção", 
  options, 
  value, 
  onOptionSelect 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  const displayValue = selectedOption || placeholder;

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.SelectContainer onClick={() => setIsOpen(!isOpen)}>
        <S.SelectedOption>
          {displayValue}
          <S.IconWrapper>
            {isOpen ? <FaChevronUp size="0.6em" /> : <FaChevronDown size="0.6em" />}
          </S.IconWrapper>
        </S.SelectedOption>
        {isOpen && (
          <S.Dropdown>
            {options.map((option, index) => (
              <S.Option
                key={index}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </S.Option>
            ))}
          </S.Dropdown>
        )}
      </S.SelectContainer>
    </S.Container>
  );
};

export default Select;