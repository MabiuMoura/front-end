import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthGoogle from "../../../../components/Auth/AuthGoogle";
import { Form } from "../../../../components/Form";
import { ButtonComponent } from "../../../../components/Form/Button/ButtonComponent";
import { useAuthUser } from "../../../../context/authContext";
import { RoutePath } from "../../../../shared/constants/enums";
import { loginSchema } from "../../../../shared/constants/schemas";
import * as S from "./styles";
import { ForgotPassword } from "./styles";

export type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 768);
  const { login } = useAuthUser();
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = loginForm;

  async function submitLogin(data: LoginData) {
    try {
      const response = await login(data.email, data.password);
      reset({ email: "", password: "" });
      
      if (response?.infoUser.force_password_change) {
        navigate(RoutePath.RESETPASSWORD, {
          state: { token: response.access_token },
          replace: true,
        });
      } else if (response?.is_first_login) {
        navigate(RoutePath.REGISTER, {
          state: { isFirstLogin: true },
          replace: true,
        });
      } else {
        navigate(RoutePath.USER, {
          state: { loginSuccess: true },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  }

  const handleResize = () => {
    setIsScreenSmall(window.innerWidth <= 543);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.FormStyle>
      <FormProvider {...loginForm}>
        <form autoComplete='off' onSubmit={handleSubmit(submitLogin)}>
          <Form.Field>
            <Form.Label htmlFor='email'>{"E-mail"}</Form.Label>
            <Form.Input
              type='text'
              name='email'
              placeholder='Digite seu e-mail'
            />
            <Form.ErrorMessage field='email' />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='password'>{"Senha"}</Form.Label>
            <Form.Input
              type='password'
              name='password'
              placeholder='Digite sua senha'
              isPassword={true}
            />
            <Form.ErrorMessage field='password' />
            <ForgotPassword>
              <span>Esqueceu sua senha?</span>
            </ForgotPassword>
          </Form.Field>
          <S.SmallerGapContainer>
            <ButtonComponent
              type='submit'
              isDisabled={isSubmitting}
              backgroundColor={""}
              color={""}
            >
              {"Entrar"}
            </ButtonComponent>
          </S.SmallerGapContainer>
          <S.DivCenter>
              <S.Line />
              <S.Message>ou</S.Message>
              <S.Line />
            </S.DivCenter>
            <S.DivCenter>
            <AuthGoogle isScreenSmall={isScreenSmall}/>
            </S.DivCenter>
        </form>
      </FormProvider>
    </S.FormStyle>
  );
};

export default LoginForm;

