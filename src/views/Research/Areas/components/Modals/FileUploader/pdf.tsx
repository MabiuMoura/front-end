import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as S from "./styles";
import { FaTrash } from "react-icons/fa";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { research } from "../../../../../../services/endpoints";
import { ThreeDot } from "react-loading-indicators";

interface PdfUploaderProps {
  onFileUpload: (fileUrl: string | null) => void;
  initialFile?: string;
  file?: string;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({
  onFileUpload,
  initialFile,
  file,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const downloadPDF = async () => {
      if (file) setPreview(file);
      if (!initialFile) return;

      setLoading(true); // Inicia o estado de carregamento
      try {
        const blob = await research.getPDF(initialFile);
        const pdf = URL.createObjectURL(blob);
        setPreview(pdf);
        onFileUpload(pdf)
      } catch {
        console.log("NULO");
        setPreview(null);
        onFileUpload(null);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    downloadPDF();
  }, [file, initialFile]);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPreview(null);
    onFileUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    multiple: false,
  });

  return (
    <S.DropzoneWrapper {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {loading ? (
        <ThreeDot color="#64748B" size="medium" text="" textColor="" />
      ) : preview ? (
        <S.ImageContainer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <S.pdfPreview>
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={preview} />
            </Worker>
          </S.pdfPreview>
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
          <S.PdfIcon />
          <p>Solte o PDF aqui...</p>
        </S.IconTextsWrapper>
      ) : (
        <S.IconTextsWrapper>
          <S.PdfIcon />
          <S.TextContainerStyles>
            <S.TextUp>Solte o PDF aqui ou navegue pelos arquivos</S.TextUp>
            <S.TextBottom>Extensão Suportada: PDF</S.TextBottom>
          </S.TextContainerStyles>
        </S.IconTextsWrapper>
      )}
    </S.DropzoneWrapper>
  );
};

export default PdfUploader;
