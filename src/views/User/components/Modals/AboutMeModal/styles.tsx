import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: 320px;
  gap: 17px;
`;

export const ContentContainer = styled.textarea`
  background-color: ${({ theme }) =>
    theme.colors.background_colors.backgroundBlue};
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  border: 0px;
  border-radius: 6px;
  resize: none;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary_colors.lilac};
  }
`;

export const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
  margin-top: 10px;
`;
