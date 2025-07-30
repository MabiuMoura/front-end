import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as S from "./styles";
import { FaTrash } from "react-icons/fa";

interface ImageUploaderProps {
  onFileUpload: (fileUrl: string | null) => void;
  initialFile?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileUpload,
  initialFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileUpload(previewUrl);
    },
    [onFileUpload]
  );

  useEffect(() => {
    // Se `initialFile` for passado, define como preview inicial
    if (initialFile) {
      setPreview(initialFile);
    }
  }, [initialFile]);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreview(null);
    onFileUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/svg+xml": [],
    },
    multiple: false,
  });

  return (
    <S.DropzoneWrapper {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {preview ? (
        <S.ImageContainer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <S.ImagePreview src={preview} alt="Preview" />
          {hovered && (
            <S.Overlay onClick={handleRemove}>
              <S.RemoveButton onClick={handleRemove}>
                <FaTrash />
              </S.RemoveButton>
            </S.Overlay>
          )}
        </S.ImageContainer>
      ) : isDragActive ? (
        <S.IconTextsWrapper>
          <S.Icon />
          <p>Solte a imagem aqui...</p>
        </S.IconTextsWrapper>
      ) : (
        <S.IconTextsWrapper>
          <S.Icon />
          <S.TextContainerStyles>
            <S.TextUp>Solte a foto aqui ou navegue pelos arquivos</S.TextUp>
            <S.TextBottom>
              Extensões Suportadas: PNG, JPG, JPEG, SVG
            </S.TextBottom>
          </S.TextContainerStyles>
        </S.IconTextsWrapper>
      )}
    </S.DropzoneWrapper>
  );
};

export default ImageUploader;
