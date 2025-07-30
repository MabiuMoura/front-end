import LoginForm from "../FormLogin"
import * as S from "./styles"
import LogoRH from "../../../../assets/logo.svg"

const CardLogin = () => {
    return (
        <S.ContainerCard>
            <img src={LogoRH} alt="Logo RH"/>
            <LoginForm/>
        </S.ContainerCard>
    )
}

export default CardLogin