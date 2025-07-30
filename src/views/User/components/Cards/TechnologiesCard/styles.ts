import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const TechImage = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
    align-items: center;
    justify-content: center;

    div {
        background-color: ${({theme}) => theme.colors.primary_colors.blue200};
        padding: 15px; 
        border-radius: 10px; 
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

        img {
            border-radius: 5px;
        }
    }
`;

export const TechDiv = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    h3{
        color:rgb(134, 154, 184);
        font-size: 15px;
        font-weight: 600;

        @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
            font-size:13px;
        }

        @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
            font-size:1px;
        }

        @media (max-width: ${device.tablet}) {
            font-size:10px;
        }
    }
`;

export const TechGroup = styled.div`
    display: flex;
    gap: 50px; 

    > div:not(:last-child) {  
        border-right: 1px solid rgb(134, 154, 184);; 
        padding-right: 50px; 

        @media (max-width: 1020px){
        gap: 30px; 
    }
    }

    @media (max-width: 1020px){
        gap: 30px; 
    }

`;

export const textDiv = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    text-align: justify;
    color: ${({ theme }) => theme.colors.primary_colors.lilac};
`;