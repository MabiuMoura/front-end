import * as S from "./styles";

interface InputPdfModalTableProps {
  label?: string;
  placeHolder?: string;
  pdf?: File | null; 
  onPdfChange?: (file: File | null) => void; 
  width?: string;
}

const InputPdfModalTable: React.FC<InputPdfModalTableProps> = ({ label, pdf, onPdfChange, width, placeHolder }) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; 
        if (onPdfChange) {
          onPdfChange(file); 
        }
    };
      
      const handleClick = () => {
        document.getElementById('hiddenFileInput')?.click(); 
      };
  
    return (
    <S.ModalContainer>
      <S.Label>{label}</S.Label>
      <S.InputWrapper onClick={handleClick}>
      <S.HiddenFileInput
          id="hiddenFileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <S.StyledButton width ={width} >
          {pdf ? pdf.name : placeHolder}
        </S.StyledButton>   
        <S.IconWrapper>
          <S.AddIcon />
        </S.IconWrapper>
      </S.InputWrapper>
    </S.ModalContainer>
  );
};

export default InputPdfModalTable;
