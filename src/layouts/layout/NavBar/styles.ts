import { FaBell } from "react-icons/fa";
import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";
import { HiOutlineBars3 } from "react-icons/hi2";



export const HeaderStyled = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  background-color: ${({theme})=> theme.colors.primary_colors.blue};
  z-index: 999;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 9px;
  padding-right: 26px;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const SmallContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: ${device.tablet}) {
    justify-content: center;
  }
`;

export const SmallTwoContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const UserImage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;

  img, div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;


export const MenuIcon = styled(HiOutlineBars3)`
  font-size: 28px;
  display: none;
  cursor: pointer;
  
  @media (max-width: ${device.tablet}) {
    display: block;
  }
`;


export const IconBell = styled(FaBell) `
  font-size: 22px;
`;

export const Logo = styled.img`
  user-select: none;
  width: 72px;
  height: auto;

  @media (max-width: ${device.tablet}) {
    display: none;
  }
`;

export const LogoCenter = styled.img`
  user-select: none;
  width: 72px;
  height: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const IconSide = styled.div`
  &:hover {
      cursor: pointer;
    }
`;

export const TextRoute = styled.p`
  font-size: 15px;
  color: #fff;
  margin-left: 10px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
`