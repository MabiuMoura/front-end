import styled from "styled-components";
import BackgroundIcon from "../../../../../assets/areaPageBackgroundIcon.svg";
import { device } from "../../../../../shared/configs/device.config";

export const AreaPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  height: 100%;
  width: 100%;
  margin-bottom: 25px;
  gap: 5%;
  @media (max-width: 768px) {
    padding-left: 3%;
    padding-right: 3%;
  }
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding-left: 40px;
  padding-right: 8%;
  gap: 30px;
  width: 100%;
  background: linear-gradient(to right, #0d103d 0%, #0d103d 75%, #172d56 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: ${device.desktop}) {
    height: 180px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    height: 150px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    height: 110px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    height: 90px;
    gap: 10px;
    padding-left: 10px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    height: 80px;
    gap: 10px;
    padding-left: 10px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    height: 80px;
    gap: 5px;
    padding-left: 5px;
  }

  @media (max-width: ${device.mobileSmall}) {
    height: 80px;
    gap: 5px;
    padding-left: 5px;
  }
`;

export const HeaderIcon = styled.div`
  background-image: url(${BackgroundIcon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: auto;
  position: absolute;
  right: 1%;
  @media (min-width: ${device.desktop}) {
    height: 150px;
    width: 150px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    height: 120px;
    width: 120px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    height: 90px;
    width: 90px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    height: 70px;
    width: 70px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    height: 50px;
    width: 50px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    height: 50px;
    width: 50px;
  }

  @media (max-width: ${device.mobileSmall}) {
    height: 50px;
    width: 50px;
  }
`;

export const HeaderTitle = styled.h1`
  @media (min-width: ${device.desktop}) {
    font-size: 33px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size: 28px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 24px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size: 19px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 16px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 13px;
    font-weight: 600;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 11px;
    font-weight: 600;
  }
`;

export const HeaderImage = styled.div<{ content: string }>`
  background-image: url(${(props) => props.content});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  
  @media (min-width: ${device.desktop}) {
    height: 150px;
    width: 150px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    height: 120px;
    width: 120px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    height: 90px;
    width: 90px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    height: 70px;
    width: 70px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    height: 50px;
    width: 50px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    height: 50px;
    width: 50px;
  }

  @media (max-width: ${device.mobileSmall}) {
    height: 40px;
    width: 40px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;
  @media (min-width: ${device.desktop}) {
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
  }

  @media (max-width: ${device.mobileSmall}) {
  }
`;

export const Title = styled.h3`
  color: #858b95;
  font-size: 19px;
  margin-bottom: 40px;
  font-weight: 600;
  @media (min-width: ${device.desktop}) {
    font-size: 21px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size: 18px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 15px;
    margin-bottom: 30px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size: 12px;
    margin-bottom: 20px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 12px;
    margin-bottom: 20px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 12px;
    margin-bottom: 15px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 11px;
    margin-bottom: 10px;
  }
`;

export const ContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: visible;
  margin-left: 50px;
  margin-bottom: 110px;
  @media (min-width: ${device.desktop}) {
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    margin-bottom: 80px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    margin-bottom: 80px;
    margin-left: 30px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    margin-bottom: 60px;
    margin-left: 25px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    margin-bottom: 60px;
    margin-left: 20px;
  }

  @media (max-width: ${device.mobileSmall}) {
    margin-bottom: 50px;
    margin-left: 15px;
  }
`;

export const Description = styled.p`
  margin-bottom: 30px;

  @media (min-width: ${device.desktop}) {
    font-size: 18px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size: 15px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 15px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size: 12px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 12px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 12px;
    margin-bottom: 10px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 11px;
    margin-bottom: 10px;
  }
`;

export const ContainerResearchers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  margin-left: 50px;
  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    margin-left: 30px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    margin-left: 25px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    margin-left: 20px;
  }

  @media (max-width: ${device.mobileSmall}) {
    margin-left: 20px;
  }
`;
