import styled from "styled-components";

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1rem;
`;
export const Progress = styled.div`
  width: 90%;
  height: 0.5rem;
  border-radius: 2px 0px 0px 2px;
  background: linear-gradient(to right, red 5%, orange 50%, green 100%);
`;

export const Emoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  margin-left: -12px;
  padding-bottom: 1px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

export const DescriptionText = styled.div`
  cursor: default;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 13px;
  margin-bottom: 10px;
`;
