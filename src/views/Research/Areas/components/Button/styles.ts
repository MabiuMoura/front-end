import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const StyledButton = styled.button<{ width: string[]; height: string[]; fontSize?: string[]; fontweight?: string[]  }>`
    width: ${(props) => props.width[0] || '16.2rem'};
    height: ${(props) => props.height[0] || '2.1rem'};
    font-size: 16px;
    font-weight: 600;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    word-spacing: 0.1rem;
    background-color: ${(props) => props.theme.colors.primary_colors.gray50};
    color:black;
    //color: ${(props) => props.theme.colors.secondary_colors.dark};
    font-family: ${(props) => props.theme.fonts.poppins};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.colors.primary_colors.gray100};
    }

    // Ultrawide
    @media (min-width: ${device.desktop}) {
        width: ${(props) => props.width[6] || props.width[0] || '16.4rem'};
        height: ${(props) => props.height[6] || props.height[0] || '2.2rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[6] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[6] ?? props.fontweight[0] : '1.5rem')};
    }

    // Desktop
    @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
        width: ${(props) => props.width[5] || props.width[0] || '16.4rem'};
        height: ${(props) => props.height[5] || props.height[0] || '2.2rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[5] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[5] ?? props.fontweight[0] : '1.5rem')};
    }

    // Desktop HD
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        width: ${(props) => props.width[4] || props.width[0] || '15rem'};
        height: ${(props) => props.height[4] || props.height[0] || '1.9rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[4] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[4] ?? props.fontweight[0] : '1.5rem')};
    }

    // Laptop
    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        width: ${(props) => props.width[3] || props.width[0] || '14rem'};
        height: ${(props) => props.height[3] || props.height[0] || '1.7rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[3] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[3] ?? props.fontweight[0] : '1.5rem')};
    }

    // Tablet
    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        width: ${(props) => props.width[2] || props.width[0] || '13rem'};
        height: ${(props) => props.height[2] || props.height[0] || '1.7rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[2] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[2] ?? props.fontweight[0] : '1.5rem')};
    }

    // Mobile
    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        width: ${(props) => props.width[1] || props.width[0] || '11rem'};
        height: ${(props) => props.height[1] || props.height[0] || '1.7rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[1] ?? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[1] ?? props.fontweight[0] : '1.5rem')};
    }

    // Mobile Small
    @media (max-width: ${device.mobileSmall}) {
        width: ${(props) => props.width[0] || '10rem'};
        height: ${(props) => props.height[0] || '1.5rem'};
        font-size: ${(props) => (props.fontSize ? props.fontSize[0] : '1.5rem')};
        font-weight: ${(props) => (props.fontweight ? props.fontweight[0] : '1.5rem')};
    }
    `;