import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";
import { VscEdit } from "react-icons/vsc";
import { TbTrashFilled } from "react-icons/tb";

export const Card = styled.div`
  display: flex;
  height: 50%;
  width: 14%;
  position: relative;
  justify-content: center;
  word-wrap: break-word;
  @media (min-width: 1441px) {
    min-height: 290px;
    max-height: 330px;
    flex-wrap: wrap;
    height: 45%;
    width: 15%;
    margin-bottom: 40px;
    margin-top: 120px;
  }
  // LAPTOP L
  @media (min-width: 1025px) and (max-width: 1440px) {
    min-height: 200px;
    max-height: 300px;
    height: 45%;
    width: 15%;
    margin-bottom: 40px;
    margin-top: 90px;
  }
  // LAPTOP
  @media (min-width: 769px) and (max-width: 1024px) {
    min-height: 160px;
    max-height: 240px;
    height: 45%;
    width: 15%;
    margin-bottom: 40px;
    margin-top: 60px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    height: 70%;
    width: 30%;
    min-height: 150px;
    max-height: 180px;
    margin-top: 100px;
  }
  @media (max-width: 425px) {
    height: 70%;
    width: 30%;
    min-height: 150px;
    max-height: 180px;
    margin-top: 80px;
  }
`;

export const CardImage = styled.div<{ content: string }>`
  width: 75%;
  height: 50%;
  background-color: #4d4e53;
  border-radius: 50%;
  background-image: url(${(props) => props.content});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: -20%;
  @media (min-width: 1441px) {
    width: 140px;
    height: 140px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 70px;
    height: 80px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
  @media (max-width: 425px) {
    width: 75px;
    height: 75px;
  }
`;

export const CardBody = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: #2c2d35;
  border-radius: 15px;
  border: 1px solid white;
  height: 100%;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: flex-end;

  @media (min-width: 1441px) {
    font-size: 1rem;
    padding: 7px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 0.7rem;
    padding: 5px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.6rem;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 0.7rem;
  }
  @media (max-width: 425px) {
    font-size: 0.5rem;
    padding: 4px;
  }
`;

export const Text = styled.p`
  font-size: 15px;
  padding-top: 25%;
  padding-left: 10px;
  padding-right: 10px;
  align-content: center;
  height: 70%;

  @media (max-width: ${device.laptopL}) {
    font-size: 12px;
  }

  @media (max-width: 1152px) {
    font-size: 9px;
  }

  @media (max-width: ${device.tablet}) {
    font-size: 11px;
  }

  @media (max-width: 504px) {
    font-size: 9px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 8px;
  }
`;

export const Div = styled.div`
  display: flex;
  //margin-top:20%;
  //margin-bottom:10%;
  width: 100%;
  height: 25%;
  justify-content: space-between;
  align-items: center;
`;

export const Span = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #858b95;
  text-align: center;
  width: 65%;
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 85%;
  }

  @media (max-width: ${device.laptopL}) {
    font-size: 11px;
  }

  @media (max-width: 1152px) {
    font-size: 8px;
  }

  @media (max-width: ${device.tablet}) {
    font-size: 10px;
  }

  @media (max-width: 504px) {
    font-size: 8px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 7px;
  }
`;

export const Void = styled.span`
  width: 20%;
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 15%;
  }
`;

export const Edit = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 8px;
  &:hover {
    background-color: #191929;
  }
`;

export const Line = styled.div`
  height: 1px;
  background-color: #94a3b8;
  width: 100%;
  border: none;
  margin-bottom: 5px;
`;

export const Delete = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: #191929;
  }
`;

export const EditIcon = styled(VscEdit)`
  color: #94a3b8;
  @media (min-width: 1441px) {
    font-size: 22px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 15px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 13px;
  }
  // Tablet
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

export const DeleteIcon = styled(TbTrashFilled)`
  color: #94a3b8;
  @media (min-width: 1441px) {
    font-size: 22px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 15px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 13px;
  }
  // Tablet
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 425px) {
    font-size: 13px;
  }
`;

export const ImgText = styled.p`
  color: #94a3b8;
  @media (min-width: 1441px) {
    font-size: 15px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    font-size: 11.5px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 9.5px;
  }
  // Tablet
  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 11px;
  }
  @media (max-width: 425px) {
    font-size: 8.5px;
  }
`;

export const DropDownWrapper = styled.div`
  @media (min-width: 1441px) {
    width: 125px;
    padding: 10px;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 90px;
    padding: 7px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 75px;
    padding: 5px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    width: 90px;
    padding: 7px;
  }
  @media (max-width: 425px) {
    width: 60px;
    padding: 4px;
  }
`;
