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
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
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

export const Label = styled.label`
  color: white;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Input = styled.input<{ width?: string; height?: string }>`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  background-color: ${({ theme }) =>
    theme.colors.background_colors.backgroundBlue};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  outline: none;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};

  &:focus {
    border: 0.25px solid ${({ theme }) => theme.colors.primary_colors.lilac};
  }
`;

export const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
  margin-top: 10px;
`;

export const AddButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary_colors.blueGray};
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 22px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_colors.blue200};
    cursor: pointer;
  }
`;

export const GroupInputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  & > div {
    flex: 1;
  }
`;

export const GroupsList = styled.div`
  margin-top: 10px;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  padding: 5px;

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background_colors.backgroundBlue};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary_colors.blue200};
    border-radius: 4px;
  }
`;

export const GroupItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  background-color: ${({ theme }) => theme.colors.primary_colors.slate700};
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.alert_colors.errorModal};
  cursor: pointer;
  padding: 4px;
`;
