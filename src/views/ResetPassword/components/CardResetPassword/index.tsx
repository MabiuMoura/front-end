import ResetPasswordForm from "../FormResetPassword"
import * as S from "./styles"
import LogoRH from "../../../../assets/logo.svg"

const CardResetPassword = () => {
    return (
        <S.ContainerCard>
            <img src={LogoRH} alt="Logo RH"/>
            <ResetPasswordForm/>
        </S.ContainerCard>
    )
}

export default CardResetPassword