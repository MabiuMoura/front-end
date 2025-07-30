import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SelectInputProps {
  label: string;
  placeholder: string | undefined;
  options?: string[] | { label: string; value: string }[];
  value?: string | undefined;
  onOptionSelect: (option: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean| string) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  options = [],
  value,
  onOptionSelect,
  isOpen,
  setIsOpen,
  containerRef,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [selectOptions, setSelectOptions] = useState<string[] | { label: string; value: string }[]>(options);

  useEffect(() => {
    if (value !== inputValue) {
      const selectedOption = options.find(
        (option) => typeof option === "object" && "value" in option && option.value === value
      );

      setInputValue(selectedOption && typeof selectedOption === "object" ? selectedOption.label : "");
    }
  }, [value, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredOptions = selectOptions.filter((option) => {
    if (typeof option === "string") {
      return option.toLowerCase().includes(inputValue.toLowerCase());
    } else if (option && typeof option === "object" && "label" in option) {
      return option.label.toLowerCase().includes(inputValue.toLowerCase());
    }
    return false;
  });

  return (
    <S.Container ref={containerRef}>
      <S.Label>{label}</S.Label>
      <S.SelectContainer>
        <S.Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
        />
        <S.IconWrapper onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronUp size="0.6em" /> : <FaChevronDown size="0.6em" />}
        </S.IconWrapper>
        {isOpen && (
          <S.Dropdown>
            {filteredOptions.map((option, index) => (
              <S.Option
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  const selectedLabel = typeof option === "string" ? option : option.label;
                  setInputValue(selectedLabel);
                  onOptionSelect(typeof option === "string" ? option : option.value);
                }}
              >
                {typeof option === "string" ? option : option.label}
              </S.Option>
            ))}
          </S.Dropdown>
        )}
      </S.SelectContainer>
    </S.Container>
  );
};

export default SelectInput;
