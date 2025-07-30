import React, { useEffect, useState, useCallback } from "react";
import ButtonLight from "../../components/Buttons/ButtonLight";
import { ModalGeneral } from "../../components/Modals/ModalGeneral";
import RegisterMembersModal from "./components/Modal";
import * as S from "./styles";
import SearchFilterMembers from "../../components/SearchFilters/SearchFilterMembers";
import { User, UsersResponse } from "../../shared/constants/interfaces";
import { MemberCard } from "./components/MemberCard";
import { users } from "../../services/endpoints";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../shared/constants/enums";

const MembersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("AZ");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const params: any = {}

      if (searchQuery.trim() !== "") {
        params.search = {
          name: searchQuery,
          //expertise: searchQuery,
        };
      }

      if (selectedOption === "AZ") {
        params.order = { name: "ASC" };
      } else if (selectedOption === "ZA") {
        params.order = { name: "DESC" };
      } else if (selectedOption === "newest") {
        params.order = { memberSince: "DESC" };
      } else if (selectedOption === "oldest") {
        params.order = { memberSince: "ASC" };
      }

      //console.log("Parâmetros passados para a API", params);

      const response: UsersResponse = await users.getUsers(params);
      //console.log("Dados recebidos da API:", response);

      setUsersData(response.items);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedOption]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openEditModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMemberAdded = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleMemberDeleted = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = (order: string) => {
    setSelectedOption(order);
  }

  const handleNavigate = (userId: string) => {
    navigate(RoutePath.MEMBERS_VIEW_PAGE.replace(":IDUser", userId));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.Container>
      <SearchFilterMembers 
        onSearch={handleSearch} 
        isModalOpen={isModalFilterOpen} 
        setIsModalOpen={setIsModalFilterOpen} 
        selectedOption={selectedOption}
        onSortChange={handleSortChange}
        searchQuery={searchQuery}
      />
      <S.MembersContainer>
        {usersData.map((member) => (
          <MemberCard 
          key={member.id}
          Member={member}
          onMemberDeleted={handleMemberDeleted}
          handleShowMoreClick={()=>{handleNavigate(member.id)}}
          />
        ))}
      </S.MembersContainer>
      
      <S.Line></S.Line> 
      
      <S.FooterContainer>
        <S.MembersCount>{usersData.length}</S.MembersCount>
        <S.FooterSpan>Membros</S.FooterSpan>
        <ButtonLight text="Cadastrar Membro" onClick={openEditModal} />
      </S.FooterContainer>

      <ModalGeneral 
        title="Cadastrar Membro" 
        show={isModalOpen} 
        onClose={closeModal} 
        width="32.5rem"
      >
        <RegisterMembersModal 
          onClose={closeModal} 
          onMemberAdded={handleMemberAdded} 
        />
      </ModalGeneral>
    </S.Container>
  );
};

export default MembersPage;