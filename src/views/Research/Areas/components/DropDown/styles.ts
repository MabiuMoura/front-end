import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";


export const DropdownContainer = styled.div`
    position: relative;
    user-select: none;
    display: inline-block;
    width:30px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        width:20px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        width:20px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        width:15px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        width:12px;
    }

    @media (max-width: ${device.mobileSmall}) {
        width:12px;
    }
`;

export const DropdownClick = styled.div`
    cursor: pointer;
    color:#94A3B8;
    width:100%;
    font-size: 24px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size: 20px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size: 19px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size: 18px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:17px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:17px;
    }
`;

export const DropdownMenu = styled.div<{ isOpen: boolean;  bgColor?:string }>`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    position: absolute;
    right: 0;
    background-color: ${({ bgColor }) => bgColor || '#4D4E53'};
    border-radius: 10px;
    border: ${({ bgColor }) => (bgColor ? `1px solid #4D4E53` : 'none')};
    align-content:space-evenly; 
`;