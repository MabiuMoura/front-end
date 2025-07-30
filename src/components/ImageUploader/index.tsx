import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from './styles';
import { FaTrash } from 'react-icons/fa';

interface ImageUploaderProps {
    onImageUpload: (imageUrl: string | null) => void;
  }

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {

    const [preview, setPreview] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        console.log("Image Preview:",previewUrl)
        onImageUpload(previewUrl);
    }, []);

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();
        setPreview(null);
        onImageUpload(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpg': [],
            'image/jpeg': [],
            'image/svg+xml': []
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
                        <S.RemoveButton onClick={handleRemove}><FaTrash /></S.RemoveButton>
                    </S.Overlay>
                )}
            </S.ImageContainer>
        ) : isDragActive ? (
            <S.IconTextsWrapper>
                <S.Icon/>
                <p>Solte a imagem aqui...</p>
            </S.IconTextsWrapper>
        ) : (
            <S.IconTextsWrapper>
                <S.Icon/>
                <S.TextContainerStyles>
                    <S.TextUp>Solte a foto do membro aqui ou navegue pelos arquivos</S.TextUp>
                    <S.TextBottom>Extensões Suportadas: PNG, JPG, JPEG, SVG</S.TextBottom>
                </S.TextContainerStyles>
            </S.IconTextsWrapper>
        )}
    </S.DropzoneWrapper>
    );
};

export default ImageUploader;
