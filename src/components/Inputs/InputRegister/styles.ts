import styled from "styled-components";

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-size: 13px;
  }
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
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 0.8rem;
  margin-top: 5px;
`;