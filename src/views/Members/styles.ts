import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

export const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  height:100%;
  width:100%;
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    padding: 25px 40px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    padding: 15px 15px;
  }

  @media (max-width: ${device.mobileSmall}) {
    padding: 15px 15px;
  }
`;

export const MembersContainer = styled.div`
  display: flex;
  width:calc(100% + 55px);
  margin-bottom:auto;
  flex-direction: row;
  justify-content:start;
  overflow: auto;
  gap: 50px;
  padding: 90px 0px 0px 40px;
  flex-wrap: wrap;
  align-items:center;
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    width:calc(100% + 45px);
    padding: 70px 0px 0px 30px;
    gap: 35px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    width:calc(100% + 30px);
    padding: 50px 0px 0px 15px;
    gap: 20px;
  }

  @media (max-width: ${device.mobileSmall}) {
    width:calc(100% + 35px);
    padding: 50px 0px 0px 15px;
    gap: 20px;
  }
`;

export const Line = styled.div`
  height: 1.5px;
  margin-bottom: 7px;
  max-height: 1.5px;
  min-height: 1.5px;
  width: 100%;
  background-color: #FFFDFA; 
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    width:calc(100% + 45px);
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    width:calc(100% + 30px);
  }

  @media (max-width: ${device.mobileSmall}) {
    width:calc(100% + 35px);
  }
`;

export const FooterContainer = styled.div`
  padding-top: 30px;
  display:flex;
  width: fit-content;
  height: 15px;
  flex-direction:row;
  padding-left:40px;
  gap:35px;
  align-items:center;

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    gap:30px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    gap:25px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    gap:20px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    gap:15px;
    padding-left:15px;
  }

  @media (max-width: ${device.mobileSmall}) {
    gap:15px;
    padding-left:15px;
  }
`

export const MembersCount = styled.div`
  font-weight:550;
  color:#CBD5E1;

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
  font-size:1.8rem;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size:1.6rem;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size:1.3rem;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size:1rem;
  } 
`

export const FooterSpan = styled.span`
  font-size:1.1rem;
  margin-right:30px;
  font-weight:300;
  color: #94A3B8;
    
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      font-size:1.1rem;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size:1.1rem;
      margin-right:25px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size:0.9rem;
      margin-right:25px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size:0.8rem;
    margin-right:20px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size:0.5rem;
    margin-right:20px;
  }
`