import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface MultiSelectInputProps {
  label: string;
  placeholder: string;
  options?: string[] | { label: string; value: string }[];
  selectedValues?: string[];
  onSelectionChange: (selected: string[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  label,
  placeholder,
  options = [],
  selectedValues = [],
  onSelectionChange,
  isOpen,
  setIsOpen,
  containerRef,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<(string | { label: string; value: string })[]>([]);

  const [selected, setSelected] = useState<string[]>(selectedValues);

  useEffect(() => {
    const filtered = options.filter((option) => {
      const label =
        typeof option === "string" ? option : option.label;
      return label.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected]);

  const toggleOption = (option: string) => {
    const isSelected = selected.includes(option);
    const newSelected = isSelected
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    setSelected(newSelected);
  };

  const getLabel = (option: string | { label: string; value: string }) =>
    typeof option === "string" ? option : option.label;

  const getValue = (option: string | { label: string; value: string }) =>
    typeof option === "string" ? option : option.value;

  return (
    <S.Container ref={containerRef}>
      <S.Label>{label}</S.Label>
      <S.SelectContainer >
      <S.Input
        type="text"
        value={selected
          .map((val) => {
            const match = options.find((opt) =>
              typeof opt === "string" ? opt === val : opt.value === val
            );
            return typeof match === "string" ? match : match?.label ?? val;
          })
          .join(", ")
        }
        onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
        placeholder={selected.length === 0 ? placeholder : ""}
        onClick={() => setIsOpen(true)}
      />
      <S.IconWrapper onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaChevronUp size="0.6em" /> : <FaChevronDown size="0.6em" />}
      </S.IconWrapper>

        {isOpen && (
          <S.Dropdown>
            {filteredOptions.map((option, index) => {
              const label = getLabel(option);
              const value = getValue(option);
              const isSelected = selected.includes(value);

              return (
                <S.Option
                  key={index}
                  onClick={() => toggleOption(value)}>
                  {label}
                  {isSelected && <IoIosCheckmarkCircle size="1.2em" />}
                </S.Option>
              );
            })}
          </S.Dropdown>
        )}
      </S.SelectContainer>
    </S.Container>
  );
};

export default MultiSelectInput;
