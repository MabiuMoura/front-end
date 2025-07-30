import styled from "styled-components";

export const BasesPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  height: 100%;
  width: 100%;
  padding-right: 3%;
  margin-bottom: 25px;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding-left: 3%;
  }
`;

export const DivAreaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  @media (min-width: 1441px) {
    padding: 0px 70px 0px 35px;
    column-gap: 4%;
    justify-content: flex-start;
    height: 88%;
    width: calc(100% + 60px);
  }
  // LAPTOP L
  @media (min-width: 1025px) and (max-width: 1440px) {
    padding: 0px 70px 0px 35px;
    column-gap: 4%;
    height: 88%;
    width: calc(100% + 60px);
  }
  // LAPTOP
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0px 70px 0px 35px;
    column-gap: 4%;
    height: 88%;
    width: calc(100% + 40px);
  }
  @media (min-width: 426px) and (max-width: 768px) {
    column-gap: 12%;
    padding-right: 40px;
    justify-content: center;
    row-gap: 0%;
    height: 88%;
    width: calc(100% + 40px);
  }
  @media (max-width: 425px) {
    column-gap: 12%;
    padding-right: 40px;
    justify-content: center;
    row-gap: 0%;
    height: 88%;
    width: calc(100% + 40px);
  }
`;

export const DivAddArea = styled.div`
  height: 5%;
  width: 100%;
  padding-left: 35px;
  padding-top: 20px;
  padding-bottom: 40px;
  @media (max-width: 768px) {
    padding-left: 13%;
    height: 10%;
  }
`;

export const ButtonAddArea = styled.button`
  width: 16.2rem;
  height: 2.1rem;
  font-size: 16px;
  font-weight: 600;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  word-spacing: 0.1rem;
  background-color: ${(props) => props.theme.colors.primary_colors.gray50};
  color: ${(props) => props.theme.colors.secondary_colors.dark};
  font-family: ${(props) => props.theme.fonts.poppins};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary_colors.gray100};
  }
  @media (min-width: 1441px) {
    width: 16.4rem;
    height: 2.2rem;
    font-size: 16px;
    font-weight: 600;
  }
  // LAPTOP L
  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 15rem;
    height: 1.9rem;
    font-size: 14px;
    font-weight: 600;
  }
  // LAPTOP
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 14rem;
    height: 1.7rem;
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: 13rem;
    height: 1.7rem;
    font-size: 11.5px;
    font-weight: 600;
  }
  @media (max-width: 425px) {
    width: 11rem;
    height: 1.7rem;
    font-size: 10px;
    font-weight: 600;
  }
`;

export const Column = styled.div`
  display: block;
  width: 100%;
`;
