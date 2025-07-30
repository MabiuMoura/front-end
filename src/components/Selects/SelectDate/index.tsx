import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import MaskedInput from "react-text-mask";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";

interface SelectDateProps {
  label: string;
  selectedDate: Date | string | null;
  onDateChange: (date: Date | null) => void;
  error?: string;
}

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const SelectDate: React.FC<SelectDateProps> = ({
  label,
  selectedDate,
  onDateChange,
  error
}) => {
  const [inputValue, setInputValue] = useState(() => {
    if (!selectedDate) return "";
    if (selectedDate instanceof Date) {
      return selectedDate.toLocaleDateString("pt-BR");
    }
    return selectedDate;
  });

  const dateMask = [
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  const isValidDate = (dateString: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      year >= 1900 &&
      year <= new Date().getFullYear()
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 10 && isValidDate(value)) {
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      onDateChange(date);
    } else if (value.length === 0) {
      onDateChange(null);
    }
  };

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
    if (date) {
      setInputValue(date.toLocaleDateString("pt-BR"));
    } else {
      setInputValue("");
    }
  };

  const getSelectedDate = (): Date | null => {
    if (!selectedDate) return null;
    if (selectedDate instanceof Date) return selectedDate;
    return new Date(selectedDate);
  };

  const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onChange, onClick }, ref) => (
      <MaskedInput
        mask={dateMask}
        guide={true}
        value={value}
        onChange={onChange}
        onClick={onClick}
        render={(inputRef, props) => (
          <S.Input
            {...props}
            ref={(node) => {
              if (node !== null) {
              if (inputRef) {
                inputRef(node);
              }
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }
            }}
            type="text"
          />
        )}
      />
    )
  );

  return (
    <S.ModalContainer>
      <S.Label>{label}</S.Label>
      <DatePicker
        selected={getSelectedDate()}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        calendarClassName="custom-datepicker"
        customInput={
          <CustomInput
            value={inputValue}
            onChange={handleInputChange}
          />
        }
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.ModalContainer>
  );
};

export default SelectDate;