import styled from "styled-components";
import ImgDefault from "../../../../../assets/user.jpg";
import { device } from "../../../../../shared/configs/device.config";

export const ContainerResearcher = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  width: 140px;
  height: 155px;
  margin-bottom: 60px;
  @media (min-width: ${device.desktop}) {
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    width: 120px;
    height: 135px;
    margin-bottom: 40px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    width: 110px;
    height: 125px;
    margin-bottom: 40px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    width: 100px;
    height: 115px;
    margin-bottom: 35px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    width: 90px;
    height: 105px;
    margin-bottom: 30px;
  }

  @media (max-width: ${device.mobileSmall}) {
    width: 80px;
    height: 95px;
    margin-bottom: 25px;
  }
`;

export const ResearcherIMG = styled.div<{ imageUrl?: string }>`
  border: 2px solid #939393;
  background-image: url(${(props) => props.imageUrl || ImgDefault});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  width: 100%;
  height: 140px;
  @media (min-width: ${device.desktop}) {
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    height: 120px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    height: 110px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    height: 100px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    height: 90px;
  }

  @media (max-width: ${device.mobileSmall}) {
    height: 80px;
  }
`;

export const ResearcherName = styled.div`
  background-color: ${({ theme }) => theme.colors.primary_colors.blue};
  position: absolute;
  width: 100%;
  height: 35px;
  border-radius: 13px;
  text-align: center;
  align-content: center;
  bottom: 0;
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (min-width: ${device.desktop}) {
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    height: 30px;
    font-size: 15px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    height: 30px;
    font-size: 13px;
  }

  @media (max-width: ${device.mobileSmall}) {
    height: 25px;
    font-size: 12px;
  }
`;
