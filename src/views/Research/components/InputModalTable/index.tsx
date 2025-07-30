import {ModalContainer, Label,  Input, TextAreaInput} from "./styles";
import * as S from "./styles"

interface InputModalTableProps {
  label?: string;
  placeHolder?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  value?: string;
  type?: 'text' | 'date' | 'textarea';
  onChange?: (value: string) => void;
  min?: string;  
  max?: string;
  error?: string;
}

const InputModalTable: React.FC<InputModalTableProps> = ({ 
  label, 
  width, 
  height, 
  backgroundColor, 
  placeHolder, 
  value, 
  onChange, 
  type, 
  min, 
  max, 
  error 
}) => {
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value); 
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (type === "date" && inputValue) {
      if (min && inputValue < min) {
        console.log(`Data inválida. A data não pode ser inferior a ${min}.`); 
        onChange?.(min); 
      } else if (max && inputValue > max) {
        console.log(`Data inválida. A data não pode ser superior a ${max}.`); 
        onChange?.(max); 
      }
    }
  };

  return (
    <ModalContainer>
      <Label>{label}</Label>
        {type === "textarea" ? <TextAreaInput placeholder={placeHolder} heigth={height} value={value} onChange={handleChange} onBlur={handleBlur}>teste</TextAreaInput> : <Input
          placeholder={placeHolder}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
        />}

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </ModalContainer>
  );  
};

export default InputModalTable;
