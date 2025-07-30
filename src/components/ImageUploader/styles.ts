import styled from 'styled-components';
import { TbCameraPlus } from "react-icons/tb";

interface DropzoneWrapperProps {
    isDragActive: boolean;
}

export const DropzoneWrapper = styled.div<DropzoneWrapperProps>`
    border: 1px dashed ${({ isDragActive, theme }) => (isDragActive ?  theme.colors.neutral_colors.white: theme.colors.primary_colors.lilac)};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: border-color 0.3s ease;
    cursor: pointer;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #fff;
`;

export const RemoveButton = styled.button`
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`;

export const TextContainerStyles = styled.div`
    display: flex;
    flex-direction: column;
`;

export const IconTextsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(TbCameraPlus)`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary_colors.blue200};
`;

export const TextUp = styled.p`
    color: ${({ theme }) => theme.colors.neutral_colors.white};
    font-family: ${({theme})=>theme.fonts.inter};
    font-size: 14px;
`;

export const TextBottom = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary_colors.lilac};
    font-family: ${({theme})=>theme.fonts.inter};
    padding-top:5px;
`;
