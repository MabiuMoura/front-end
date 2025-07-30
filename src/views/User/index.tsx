import { useEffect, useState, useCallback } from "react";
import { useAuthUser } from "../../context/authContext";
import { MeAuth } from "../../shared/constants/interfaces";
import AboutMeCard from "./components/Cards/AboutMeCard";
import AccessControlCard from "./components/Cards/AccessControlCard";
import InsigniaCard from "./components/Cards/InsigniaCard";
import ResearchesCard from "./components/Cards/ResearchesCard";
import TechnologiesCard from "./components/Cards/TechnologiesCard";
import UserCard from "./components/Cards/UserCard";
import * as S from "./styles";

const UserPage: React.FC = () => {
  const { me } = useAuthUser();
  const { roles } = useAuthUser();
  const [userData, setUserData] = useState<MeAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const role = roles?.[0]?.name; //MOCK DA ROLE PARA TESTE

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const data: MeAuth = await me();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [me]);

  const refreshUserData = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, refreshTrigger]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userData) {
    return <div>Nenhum dado de usuário encontrado.</div>;
  }

  return (
    <S.Container>
      <S.FirstColumn>
        <UserCard 
          userID={userData.id}
          name={userData.name}
          nickname={userData.nickname}
          memberSince={userData.memberSince}
          expertise={userData.expertise}
          profilePictureId={userData.profile_picture_id}
          onProfileUpdate={refreshUserData}
          onPhotoChange={(file: File) => {
            console.log('Nova foto selecionada:', file);
          }}
        />
        <InsigniaCard 
          insignias={Array.isArray(userData.insignias) ? userData.insignias : []}
          edit={role == "RH_LAPISCO_ADMIN" ? true : false}
          question={role == "RH_LAPISCO_ADMIN" ? false : true}
        />
        <AccessControlCard
          tag={!!userData.access_control_profile.tagId}
          facial={userData.access_control_profile.isFacialRegistered}
          digital={userData.access_control_profile.isFingerprintRegistered}
        />
      </S.FirstColumn>
      <S.SecondColumn>
        <AboutMeCard
        userId={userData?.id}
        aboutMe={userData?.about_me}
        linkedIn={userData?.linkedIn}
        github={userData?.github}
        onProfileUpdate={refreshUserData}
        />
        <TechnologiesCard
          userId={userData.id}
          userStacks={userData.user_stacks}
          onUpdate={refreshUserData}
        />
        <ResearchesCard 
          research_profile = {userData?.research_profile}
        />
      </S.SecondColumn>
    </S.Container>
  );
}

export default UserPage;