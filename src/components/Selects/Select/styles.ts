import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Label = styled.label`
  color: white;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const SelectedOption = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  background-color: ${({ theme }) => theme.colors.background_colors.backgroundBlue};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background_colors.backgroundBlue};
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.blue200};
  border-radius: 8px;
  margin-top: 5px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary_colors.blue};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary_colors.blue200};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primary_colors.lilac};
  }
`;

export const Option = styled.div`
  padding: 10px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_colors.blue};
  }
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
`;
