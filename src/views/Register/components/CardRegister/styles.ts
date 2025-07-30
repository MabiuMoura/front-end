import styled from "styled-components";

export const ContainerCard = styled.div`
    background-color: ${({theme}) => theme.colors.background_colors.backgroundGray};
    height: 40rem;
    width: 60%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative; 
    padding-top: 2%;
    overflow-y: auto;    
`;