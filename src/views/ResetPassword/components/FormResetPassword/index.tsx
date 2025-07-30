import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Form } from "../../../../components/Form";
import { ButtonComponent } from "../../../../components/Form/Button/ButtonComponent";
import { useAuthUser } from "../../../../context/authContext";
import { RoutePath } from "../../../../shared/constants/enums";
import { resetPasswordSchema } from "../../../../shared/constants/schemas";
import * as S from "./styles";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const { resetPassword } = useAuthUser();
  const navigate = useNavigate();
  const resetPasswordForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = resetPasswordForm;

  async function submitResetPassword(data: ResetPasswordData) {
    try {
      await resetPassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        new_password_confirm: data.confirmPassword,
        token: ''  // Token will be added in the context
      });
      reset();
      navigate(RoutePath.LOGIN);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
    }
  }

  return (
    <S.FormStyle>
      <FormProvider {...resetPasswordForm}>
        <form autoComplete='off' onSubmit={handleSubmit(submitResetPassword)}>
          <Form.Field>
            <Form.Label htmlFor='currentPassword'>{"Senha Atual"}</Form.Label>
            <Form.Input
              type='password'
              name='currentPassword'
              placeholder='Digite sua senha atual'
              isPassword={true}
            />
            <Form.ErrorMessage field='currentPassword' />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='newPassword'>{"Nova Senha"}</Form.Label>
            <Form.Input
              type='password'
              name='newPassword'
              placeholder='Digite sua nova senha'
              isPassword={true}
            />
            <Form.ErrorMessage field='newPassword' />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='confirmPassword'>{"Confirmar Nova Senha"}</Form.Label>
            <Form.Input
              type='password'
              name='confirmPassword'
              placeholder='Confirme sua nova senha'
              isPassword={true}
            />
            <Form.ErrorMessage field='confirmPassword' />
          </Form.Field>
          <S.SmallerGapContainer>
            <ButtonComponent
              type='submit'
              isDisabled={isSubmitting}
              backgroundColor={""}
              color={""}
            >
              {"Redefinir Senha"}
            </ButtonComponent>
          </S.SmallerGapContainer>
        </form>
      </FormProvider>
    </S.FormStyle>
  );
};

export default ResetPasswordForm;