import styled from "styled-components";

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
