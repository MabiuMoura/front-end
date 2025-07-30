import { useEffect, useState, useCallback } from "react";
import * as S from "./styles";
import { User, UsersResponse } from "../../../../shared/constants/interfaces";
import AboutMeCard from "../../../User/components/Cards/AboutMeCard";
import AccessControlCard from "../../../User/components/Cards/AccessControlCard";
import InsigniaCard from "../../../User/components/Cards/InsigniaCard";
import ResearchesCard from "../../../User/components/Cards/ResearchesCard";
import TechnologiesCard from "../../../User/components/Cards/TechnologiesCard";
import UserCard from "../../../User/components/Cards/UserCard";
import { useParams } from "react-router-dom";
import { users } from "../../../../services/endpoints";
import { useAuthUser } from "../../../../context/authContext";

const MemberViewPage: React.FC = () => {
  const { roles } = useAuthUser();
  const { IDUser } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const role = roles?.[0]?.name; //MOCK DA ROLE PARA TESTE

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      if (!IDUser) {
        console.error("ID do usuário não encontrado na URL");
        return;
      }

      const response: UsersResponse = await users.getUsers({
        relations: [
          "insignias",
          "access_control_profile",
          "research_profile",
          "research_profile.research_areas",
          "research_profile.papers",
          "research_profile.research_databases",
          "user_stacks",
        ],
        where: { id: IDUser },
      });

      setUserData(response.items[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [IDUser]);

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
            console.log("Nova foto selecionada:", file);
          }}
          edit={false}
        />
        <InsigniaCard
          userId={userData.id}
          insignias={
            Array.isArray(userData.insignias) ? userData.insignias : []
          }
          edit={role == "RH_LAPISCO_ADMIN" ? true : false}
          question={role == "RH_LAPISCO_ADMIN" ? false : true}
        />
        {role == "RH_LAPISCO_ADMIN" ? (
          <AccessControlCard
            tag={userData.access_control_profile!.tagId}
            facial={userData.access_control_profile!.isFacialRegistered}
            digital={userData.access_control_profile!.isFingerprintRegistered}
            edit={true}
            question={false}
            id={userData.access_control_profile?.id}
          />
        ) : null}
      </S.FirstColumn>
      <S.SecondColumn>
        <AboutMeCard
          userId={userData?.id}
          aboutMe={userData?.about_me}
          linkedIn={userData?.linkedIn}
          github={userData?.github}
          onProfileUpdate={refreshUserData}
          edit={false}
        />
        <TechnologiesCard
          userId={userData.id}
          userStacks={userData.user_stacks}
          onUpdate={refreshUserData}
          edit={false}
        />
        <ResearchesCard
          research_profile={userData?.research_profile}
          edit={false}
        />
      </S.SecondColumn>
    </S.Container>
  );
};

export default MemberViewPage;
