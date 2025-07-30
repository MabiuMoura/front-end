import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UsersList = styled.div`
  margin-top: 15px;
  height: 150px;
  overflow-y: auto;
  border-radius: 8px;
  
  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0F172A;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
  }
`;

export const UserItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #334155;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.isSelected ? props.theme.colors.primary_colors.blue800 : props.theme.colors.primary_colors.blue};

  &:last-child {
    border-bottom: none;
  }
`;

export const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #475569;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E2E8F0;
  font-weight: 500;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.p`
  margin: 0;
  color: #E2E8F0;
  font-size: 14px;
  font-weight: 500;
`;

export const UserEmail = styled.p`
  margin: 0;
  color: #94A3B8;
  font-size: 12px;
`;

export const NoResults = styled.div`
  padding: 15px;
  text-align: center;
  color: #94A3B8;
  font-size: 14px;
`;

export const LoadingMessage = styled.div`
  padding: 15px;
  text-align: center;
  color: #94A3B8;
  font-size: 14px;
`;

export const FilterInput = styled.div`
  margin-bottom: 15px;
`;

export const CheckIcon = styled.div`
  margin-left: 10px;
  color: #A5F3FC;
`;

export const ButtonContainer = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: end;
`;