
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: fit-content;
  background-color: ${({theme}) => theme.colors.primary_colors.blue};
  border-radius: 7px;
  box-sizing: border-box;
  border: 0.7px solid ${({theme}) => theme.colors.primary_colors.gray200};
  padding: 25px;

`;

