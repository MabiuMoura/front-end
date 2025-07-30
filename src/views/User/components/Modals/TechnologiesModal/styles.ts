import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 460px;
  overflow-y: auto;
  gap: 20px;
`;

export const ContainerTechList = styled.div`
  display: flex;
  width: 100%;
  max-height: 320px;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right:10px;
  &::-webkit-scrollbar {
    width: 8px;
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

export const ContainerTech = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) auto auto auto;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary_colors.blue800};
  border-radius: 10px;
  padding-right: 10px;
`;

export const DivWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  min-width: 0; // Helps with text overflow

  h4 {
    font-size: small;
    font-family: ${({theme}) => theme.fonts.inter};
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    
    &:hover::after {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 100%;
      background-color: ${({ theme }) => theme.colors.primary_colors.blue800};
      padding: 5px;
      border-radius: 5px;
      z-index: 1;
      white-space: normal;
    }
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  min-width: fit-content;

  label {
    display: flex;
    gap: 5px;
    font-size: 10px;
    font-family: ${({ theme }) => theme.fonts.inter};
    font-weight: 200;
    align-items: center;
    white-space: nowrap;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      appearance: none;
      background-color: ${({ theme }) => theme.colors.primary_colors.blue};
      border: 1px solid ${({ theme }) => theme.colors.secondary_colors.slate700};
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;

      &:checked {
        background-color: ${({ theme }) => theme.colors.primary_colors.lilac};
      }

      &:checked::before {
        content: "";
        display: block;
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
    }
  }
`;