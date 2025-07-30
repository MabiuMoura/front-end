import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const ContainerCard = styled.div`
    background-color: ${({theme}) => theme.colors.background_colors.backgroundGray};
    height: 50rem;
    width: 40rem;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        height: 170px;
        margin-bottom: 25px;
    }

    @media (max-width: ${device.tablet}){
        height: 41rem;
        width: 33rem;

        img {
            height: 120px;
            margin-bottom: 25px;
        }
    }

    @media (max-width: ${device.tablet}){
        height: 41rem;
        width: 33rem;

        img {
            height: 120px;
            margin-bottom: 25px;
        }
    }

    @media (max-width: 543px){
        height: 35rem;
        width: 20rem;

        img {
            height: 90px;
            margin-bottom: 25px;
        }
    }

    @media (max-width: ${device.mobileSmall}){
        height: 33rem;
        width: 17rem;

        img {
            height: 90px;
            margin-bottom: 25px;
        }
    }
    
`;