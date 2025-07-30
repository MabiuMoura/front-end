import styled from "styled-components";

export const ContainerLogin = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, ${({theme}) => theme.colors.neutral_colors.black}, ${({theme}) => theme.colors.background_colors.backgroundGray});
    display: flex;
    justify-content: center;
    align-items: center;
`;