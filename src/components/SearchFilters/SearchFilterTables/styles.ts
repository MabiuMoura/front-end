import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1%;
  position: relative;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1%;
  border-bottom: 2px solid #9a9ea5;
  padding-bottom: 0.5%;
  position: relative;
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 18px;
  color: #9a9ea5;

  svg {
    width: 18px;
    height: auto;
    stroke-width: 0.1px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #9a9ea5;
  font-size: 15px;
  font-weight: 300;

  &::placeholder {
    color: #9a9ea5;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 16px;
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #1e293b;
  border: 1px solid #9a9ea5;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 4px 0 0 0;
  z-index: 10;
  list-style: none;
`;

export const SuggestionItem = styled.li`
  font-size: 12px;
  padding: 10px 12px;
  cursor: pointer;
  color: #9a9ea5;
  background-color: #1e293b;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({theme}) => theme.colors.primary_colors.blue200};
  }
`;
