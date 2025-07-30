import styled from "styled-components";

export const ResearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  user-select: none;
  padding: 0px 45px;
  gap: 3%;
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0px 30px 0px 30px;
  }
  @media (max-width: 768px) {
    padding: 0px;
    align-items: center;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  //column-gap:10%;
  justify-content: space-between;
  //gap:5%;
  //height:70%;
  width: 100%;
  padding-top: 5%;
  flex-grow: 0.7;
  // Tablet
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2%;
    gap: 0;
    width: 90%;
    //height:80%;
    flex-grow: 0.7;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  margin-top: auto;
  // height:30%;
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 15px;
    //height:20%;
  }
`;
