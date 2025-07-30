import Cookies from "js-cookie";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { authEndpoints } from "../services/endpoints";
import { AccessProfile, AuthRequest, InfoUser, MeAuth, ProfileState, ResetPassword, Role } from "../shared/constants/interfaces";

interface AuthContextData {
  user?: InfoUser | null;
  accessProfile?: string | null;
  roles?: Role[] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: (googleData: any) => Promise<any>;
  logout: () => void;
  me: () => Promise<MeAuth>;
  resetPassword: (data: ResetPassword) => Promise<void>;
}

export const AuthUserContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

interface GoogleData {
  credential: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<InfoUser | null>(null);
  const [accessProfile, setAccessProfile] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const processAccessProfile = (access_profile: AccessProfile): ProfileState => {
    const profileName = Object.keys(access_profile)[0];
    const roles = access_profile[profileName].roles;
    return { profileName, roles };
  };

  const restoreAuthState = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      const savedUser = Cookies.get("user");
      const savedProfile = Cookies.get("accessProfile");
      const savedRoles = Cookies.get("roles");

      if (savedUser && savedProfile && savedRoles && (accessToken || refreshToken)) {
        if (!accessToken && refreshToken) {
          await refreshSession();
        }

        setUser(JSON.parse(savedUser));
        setAccessProfile(JSON.parse(savedProfile));
        setRoles(JSON.parse(savedRoles));
        
        if (accessToken) {
          setAccessToken(accessToken);
          api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (error) {
      console.error("Error restoring auth state:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const authRequest: AuthRequest = {
      type_auth: "BASIC_AUTH",
      email,
      password,
    };

    try {
      const response = await authEndpoints.login(authRequest);
      console.log("Response:", response);
      const { infoUser, access_profile, access_token, refresh_token, is_first_login } = response;

      const { profileName, roles } = processAccessProfile(access_profile);

      setUser(infoUser);
      setAccessProfile(profileName);
      setRoles(roles);
      setAccessToken(access_token);

      Cookies.set("accessToken", access_token);
      Cookies.set("refreshToken", refresh_token);
      Cookies.set("user", JSON.stringify(infoUser));
      Cookies.set("accessProfile", JSON.stringify(profileName));
      Cookies.set("roles", JSON.stringify(roles));
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      return response;

    } catch (error) {
      toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
      throw error;
    }
  };

  const loginWithGoogle = async (googleData: GoogleData) => {
    const authRequest = {
      type_auth: "OAUTH2_GOOGLE",
      token: googleData.credential,
    };

    console.log("token:", googleData.credential)
    try {
      const response = await authEndpoints.login(authRequest);
      const { infoUser, access_profile, access_token, refresh_token, is_first_login } = response;
      
      const { profileName, roles } = processAccessProfile(access_profile);

      setUser(infoUser);
      setAccessProfile(profileName);
      setAccessToken(access_token);
      setRoles(roles);

      Cookies.set("accessToken", access_token);
      Cookies.set("refreshToken", refresh_token);
      Cookies.set("user", JSON.stringify(infoUser));
      Cookies.set("accessProfile", JSON.stringify(profileName));
      Cookies.set("roles", JSON.stringify(roles));
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      return response;

    } catch (error) {
      toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
      throw error;
    }
  };


  const refreshSession = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token não encontrado");
    }

    try {
      const response = await authEndpoints.refreshToken(refreshToken);
      const { access_token, refresh_token } = response.data;

      setAccessToken(access_token);

      Cookies.set("accessToken", access_token);
      Cookies.set("refreshToken", refresh_token);
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
    } catch (error) {
      logout();
      throw error;
    }
  };

  useEffect(() => {
    restoreAuthState();
  }, []);

  const logout = () => {
    authEndpoints
      .logout()
      .then(() => {

        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
        Cookies.remove("accessProfile");
        Cookies.remove("roles");

        setUser(null);
        setAccessProfile(null);
        setAccessToken(null);
        delete api.defaults.headers.Authorization;

      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const me = async (): Promise<MeAuth> => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await authEndpoints.me(token);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      throw error;
    }
  };

  const resetPassword = async (data: ResetPassword) => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) {
        throw new Error("Token não encontrado");
      }
      
      const resetData = {
        ...data,
        token
      };
      
      await authEndpoints.resetPassword(resetData);
      toast.success("Senha alterada com sucesso!");
      
    } catch (error) {
      toast.error("Erro ao alterar senha. Verifique os dados informados.");
      throw error;
    }
  };


  return (
    <AuthUserContext.Provider
      value={{
        user,
        accessProfile,
        roles,
        isLoading,
        login,
        loginWithGoogle,
        logout,
        me,
        resetPassword
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error(
      "useAuthUserContext deve ser usado dentro de um AuthProvider!"
    );
  }
  return context;
};