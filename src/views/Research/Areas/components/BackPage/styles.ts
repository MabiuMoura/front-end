import { MdArrowBackIosNew } from "react-icons/md";
import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const Container = styled.span<{ strong?: boolean }>`
    font-weight:700;
    display:flex;
    padding-bottom:20px;
    height:3%;
    justify-items:center;
    align-items:center;
    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      flex-wrap:wrap;
    }
    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      flex-wrap:wrap;
    }
    @media (max-width: ${device.mobileSmall}) {
      flex-wrap:wrap;
    }
`

export const Name = styled.p<{ strong?: boolean }>`
  font-weight: ${({ strong }) => (strong ? '600' : '300')};
  display:flex;
  flex-wrap:nowrap;
  margin-right:3px;
  font-size: 16px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-weight: ${({ strong }) => (strong ? '500' : '300')};
    margin-right:2px;
    font-size: 15px;
    }
  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-weight: ${({ strong }) => (strong ? '500' : '300')};
      margin-right:2px;
      font-size: 12px;
    }
    @media (max-width: ${device.mobileSmall}) {
      font-weight: ${({ strong }) => (strong ? '500' : '300')};
      margin-right:2px;
      font-size: 12px;
    }
`
  


export const BackIcon = styled(MdArrowBackIosNew)`
  cursor: pointer;
  margin-right:1%;
  @media (min-width: ${device.desktop}) {
    font-size: 19px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size: 19px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 17px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size: 17px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 17px;
    margin-right:0.5%;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 17px;
    margin-right:0.5%;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 15px;
    margin-right:0.5%;
  }
`;