import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const Button = styled.button<{ $bgColor?: string; $fontColor?: string }>`
    background-color: ${(props) => props.$bgColor || 'white'};
    border: ${({ $bgColor }) => ($bgColor ? '1px solid #C7C7C7' : 'none')};   
    color: ${(props) => props.$fontColor || 'black'};
    border-radius: 5px;
    font-size: 18px;
    width: 47%;
    height: 3.5rem;
    cursor: pointer;
    user-select: none;

    @media (max-width: ${device.laptop}) {
        height: 3rem;
        font-size: 17px;
    }

    @media (max-width: ${device.tablet}) {
        height: 2.5rem;
        font-size: 16px;
    }

    @media (max-width: 472px) {
        height: 2rem;
        font-size: 15px;
    }
`;