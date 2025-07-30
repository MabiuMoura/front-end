import { GoogleLogin } from "@react-oauth/google";
import { Container } from "./styles";
import { useAuthUser } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../shared/constants/enums";

interface AuthGoogleProps {
  isScreenSmall: boolean;
}

const AuthGoogle: React.FC<AuthGoogleProps> = ({isScreenSmall}) => {

  const { loginWithGoogle } = useAuthUser();
  const navigate = useNavigate();

  return (
    <Container>
      <GoogleLogin
      theme="outline"
        text="signin_with"
        useOneTap={false}
        onSuccess={async (credentialResponse) => {
          const response = await loginWithGoogle(credentialResponse);
          if (response?.infoUser.force_password_change) {
            navigate(RoutePath.RESETPASSWORD, {
              state: { token: response.access_token },
              replace: true,
            });
          }
          else if (response?.is_first_login) {
            navigate(RoutePath.REGISTER, {
              state: { isFirstLogin: true },
              replace: true,
            });
          }
          else {
            navigate(RoutePath.USER, {
              state: { loginSuccess: true },
              replace: true,
            });
          }
        }}
        onError={() => {
          console.log("Erro durante o login com o Google");
        }}
        size={isScreenSmall ? "small":"large"}
      />
    </Container>
  );
};

export default AuthGoogle;
