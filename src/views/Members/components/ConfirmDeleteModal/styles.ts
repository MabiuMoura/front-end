import styled from "styled-components";

export const DeleteMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 13px;
  margin-bottom: 10px;
`;