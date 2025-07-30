import styled from "styled-components";

export const ContainerRegister = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, ${({theme}) => theme.colors.neutral_colors.black}, ${({theme}) => theme.colors.background_colors.backgroundGray});
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
        height: 120px;
        margin-bottom: 25px;
        margin-top: 25px;
    }
`;