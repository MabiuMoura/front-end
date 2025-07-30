import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from './styles';
import { FaTrash, FaFilePdf } from 'react-icons/fa';

interface PDFUploaderProps {
  onPdfUpload: (file: File | null) => void; 
  pdf?: File | null;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onPdfUpload, pdf }) => {
  const [hovered, setHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    onPdfUpload(file); 
  }, [onPdfUpload]);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onPdfUpload(null); 
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    },
    multiple: false,
  });

  return (
    <S.DropzoneWrapper {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {pdf ? (
        <S.PDFContainer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <S.PDFPreview>
            <FaFilePdf size={50} />
            <S.PDFName>{pdf.name}</S.PDFName>
          </S.PDFPreview>
          {hovered && (
            <S.Overlay onClick={handleRemove}>
              <S.RemoveButton onClick={handleRemove}>
                <FaTrash />
              </S.RemoveButton>
            </S.Overlay>
          )}
        </S.PDFContainer>
      ) : isDragActive ? (
        <S.IconTextsWrapper>
            <S.Icon/>
            <p>Solte o PDF aqui...</p>
        </S.IconTextsWrapper>
    ) : (
        <S.IconTextsWrapper>
            <S.Icon/>
            <S.TextContainerStyles>
                <S.TextUp>Solte o PDF do artigo aqui ou navegue pelos arquivos</S.TextUp>
                <S.TextBottom>Extensões Suportadas: PDF</S.TextBottom>
            </S.TextContainerStyles>
        </S.IconTextsWrapper>
    )}
</S.DropzoneWrapper>
);
};

export default PDFUploader;
