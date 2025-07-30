import styled from "styled-components";

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #fffdfa;
`;

export const DatasContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  gap: 25px;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  gap: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Number = styled.span`
  color: #858b95;
  font-weight: 700;
  @media (min-width: 1441px) {
    font-size: 2.3rem;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 1.8rem;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.6rem;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;

export const Name = styled.span`
  font-size: 1.1rem;
  color: #858b95;

  @media (min-width: 1441px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 1.1rem;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 425px) {
    font-size: 0.5rem;
  }
`;
