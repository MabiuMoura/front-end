import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
`;

export const Label = styled.label`
  color: white;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  background-color: ${({ theme }) =>
    theme.colors.background_colors.backgroundBlue};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  outline: none;

  &:focus {
    border: 0.25px solid ${({ theme }) => theme.colors.primary_colors.lilac};
  }
  width: 100%;
`;

export const DatePickerContainer = styled.div`
  width: 100%;
  max-width: 100%;
`;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
`; 
