import styled from "styled-components";

export const AccessControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  gap: 13px;
`;

export const DescriptionText = styled.div`
  cursor: default;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ControlItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e293b;
  border-radius: 8px;
  padding: 10px;
  width: 35%;
  gap: 15px;
`;

export const ControlText = styled.div`
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: 350;
  color: ${({ theme }) => theme.colors.neutral_colors.white};
`;

export const ControlIcon = styled.div`
  font-size: 35px;
`;

export const Separator = styled.div`
  width: 2px;
  height: 40%;
  background-color: #475569;
`;
