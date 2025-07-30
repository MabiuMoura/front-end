import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";
import insigniaBackground from "../../../../../assets/insigniaBackground.svg";

export const InfoContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const InsigniaList = styled.ul`
  list-style: none;
  padding: 0;
  padding-right: 10px;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
  height: 120px;
  max-height: 115px;
  overflow: auto;
`;

export const InsigniaItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackgroundWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${insigniaBackground});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DescriptionText = styled.p`
  cursor: default;
  font-family: ${({ theme }) => theme.fonts.inter};
  color: white;
  font-size: 13px;
  margin-bottom: 10px;
`;