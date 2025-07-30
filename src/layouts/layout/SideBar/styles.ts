import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";

export const SectionSideBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary_colors.blue};
  height: 100vh;
  width: fit-content;
  gap: 3px;
  position: fixed;
  color: #fff;
  padding-top: 20px;
  overflow-x: hidden;
  z-index: 999;

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    width: fit-content;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    width: fit-content;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    width: fit-content;
  }
`;

export const Line = styled.div`
  width: 100%;
  background: #616161;
  height: 1px;
  margin: 10px 0;
`;

export const GroupStyles = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60px;
  min-width: 80px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => 
    props.active ? 'rgba(217, 217, 217, 0.21)' : 'transparent'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bbbbbb29;
  }

  .text-side {
    margin-top: 4px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    color: #c7c7c7;
    font-weight: 400;
    text-align: center;
  }

  > svg {
    color: #C7C7C7;
    flex-shrink: 0;
    width: 25px;
    height: 25px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      width: 100%;

      > svg {
      color: #C7C7C7;
      flex-shrink: 0;
      width: 23px;
      height: 23px;
      }

      .text-side {
      margin-top: 4px;
      font-family: "Poppins", sans-serif;
      font-size: 11px;
      color: #c7c7c7;
      font-weight: 400;
      text-align: center;
      }
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      width: 100%;

      > svg {
      color: #C7C7C7;
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      }

      .text-side {
      margin-top: 4px;
      font-family: "Poppins", sans-serif;
      font-size: 11px;
      color: #c7c7c7;
      font-weight: 400;
      text-align: center;
      }
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      width: 100%;

      > svg {
      color: #C7C7C7;
      flex-shrink: 0;
      width: 21px;
      height: 21px;
      }

      .text-side {
      margin-top: 4px;
      font-family: "Poppins", sans-serif;
      font-size: 10px;
      color: #c7c7c7;
      font-weight: 400;
      text-align: center;
      }
  }
`;