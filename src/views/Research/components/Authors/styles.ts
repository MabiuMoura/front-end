import styled from "styled-components";

export const AuthorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AuthorItem = styled.div<{ $index: number }>`
  position: relative;
  z-index: ${({ $index }) => 10 - $index};
  margin-left: ${({ $index }) => ($index === 0 ? "0" : "-10px")}; 
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
