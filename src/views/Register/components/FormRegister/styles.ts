import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10rem;
`;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const Step = styled.div<{active: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({active, theme}) => 
    active ? theme.colors.primary_colors.light : theme.colors.primary_colors.gray100};
  color: white;
  font-weight: bold;
`;

export const StepLine = styled.div<{active: boolean}>`
  width: 50px;
  height: 2px;
  background-color: ${({active, theme}) => 
    active ? theme.colors.primary_colors.light : theme.colors.primary_colors.gray100};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({theme}) => theme.colors.primary_colors.gray100};
  background-color: ${({theme}) => theme.colors.primary_colors.gray};
  color: white;
  border-radius: 4px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({theme}) => theme.colors.primary_colors.light};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;