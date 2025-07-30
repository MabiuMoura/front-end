import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { device } from "../../../../shared/configs/device.config";

export const HiddenFileInput = styled.input`
  display: none;
`;

export const StyledButton = styled.button<{width?:string}>`
  background-color: #475569;
  color: #CBD5E1;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: ${({ width }) => width || '100%'};
  height:3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${device.tablet}) {
    font-size: 12px;
    height:2.5rem;
    }
  @media screen and (max-width: 472px) {
    font-size: 10px;
    height:2.2rem;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
`;

export const Label = styled.label`
  color: white;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const AddIcon = styled(IoIosAdd)`
  color: white;
  font-size: 30px;
  @media (max-width: ${device.tablet}) {
    font-size: 25px;
    }
  @media screen and (max-width: 472px) {
    font-size: 20px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #64748B;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  @media (max-width: ${device.tablet}) {
    width: 25px;
    height: 25px;
    }
  @media screen and (max-width: 472px) {
    width: 20px;
    height: 20px;
  }
`;
