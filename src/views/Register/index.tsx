import CardRegister from './components/CardRegister'
import * as S from './styles'
import LogoRH from "../../assets/logo.svg";

const RegisterPage = () => {
    return (
       <S.ContainerRegister>
            <img src={LogoRH} alt="Logo RH"/>
            <CardRegister/>
       </S.ContainerRegister>
    )
}

export default RegisterPage