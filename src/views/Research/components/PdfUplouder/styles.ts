import styled from 'styled-components';
import { device } from '../../../../shared/configs/device.config';
import { FaFilePdf } from 'react-icons/fa';

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
  
  @media (max-width: ${device.tablet}) {
    height:170px;
    }
  @media screen and (max-width: 472px) {
    height:170px;
  }
`;


export const PDFContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PDFPreview = styled.div`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
  color: #cccccc;
`;

export const PDFName = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  @media (max-width: ${device.tablet}) {
    font-size: 13px;
    }
  @media screen and (max-width: 472px) {
    font-size: 11px;
  }
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
  
  @media (max-width: ${device.tablet}) {
    font-size: 15px;
    }
  @media screen and (max-width: 472px) {
    font-size: 12px;
  }
`;

export const Icon = styled(FaFilePdf)`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary_colors.blue200};
`;


export const TextUp = styled.p`
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
`;

export const TextBottom = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  font-family: ${({ theme }) => theme.fonts.inter};
  padding-top: 5px;
`;
