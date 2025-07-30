import React, { useState, useEffect } from 'react';
import * as S from "./styles";
import InputModal from "../../../../../components/Inputs/InputModals";
import { User } from '../../../../../shared/constants/interfaces';
import { users } from '../../../../../services/endpoints';
import { FaCheck } from "react-icons/fa";
import { IconFetch } from '../../IconFetch';
import ButtonLight from "../../../../../components/Buttons/ButtonLight";

interface GroupMembers {
  [groupId: string]: User[];
}

interface AddPeopleModalContentProps {
  onSelectUser?: (user: User, groupId: string, isSelected: boolean) => void;
  selectedGroupId?: string;
  initialGroupMembers?: GroupMembers;
  onConfirm?: (confirmedMembers: GroupMembers) => void; // Callback para confirmar as seleções
}

const AddPeopleModalContent: React.FC<AddPeopleModalContentProps> = ({
  onSelectUser,
  selectedGroupId,
  initialGroupMembers = {},
  onConfirm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado temporário para as seleções de usuários
  const [tempGroupMembers, setTempGroupMembers] = useState<GroupMembers>(initialGroupMembers);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await users.getUsers({});
      setUserResults(response.items);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUserResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const filteredUsers = searchQuery.trim() !== '' 
    ? userResults.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : userResults;

  const toggleUserSelection = (user: User) => {
    if (!selectedGroupId) return;
    
    const currentGroupMembers = tempGroupMembers[selectedGroupId] || [];
    const isSelected = currentGroupMembers.some(u => u.id === user.id);
    
    let newGroupMembers: User[];
    if (isSelected) {
      newGroupMembers = currentGroupMembers.filter(u => u.id !== user.id);
    } else {
      newGroupMembers = [...currentGroupMembers, user];
    }
    
    const updatedTempGroupMembers = {
      ...tempGroupMembers,
      [selectedGroupId]: newGroupMembers
    };
    
    setTempGroupMembers(updatedTempGroupMembers);
  };

  const isUserSelected = (user: User): boolean => {
    if (!selectedGroupId) return false;
    const currentGroupMembers = tempGroupMembers[selectedGroupId] || [];
    return currentGroupMembers.some(u => u.id === user.id);
  };

  const handleConfirm = () => {
    if (!selectedGroupId) return;

    // Confirma as seleções temporárias
    const confirmedMembers = { ...tempGroupMembers };
    if (onConfirm) {
      onConfirm(confirmedMembers);
    }
  };

  return (
    <S.SearchContainer>
      <h4 style={{ color: '#CBD5E1', margin: '0 0 10px 0', fontSize: '14px' }}>{selectedGroupId}</h4>
      <S.FilterInput>
        <InputModal
          placeholder="Pesquise o nome do membro"
          value={searchQuery}
          onChange={handleInputChange}
          width="100%"
        />
      </S.FilterInput>
      
      <S.UsersList>
        {loading ? (
          <S.LoadingMessage>Carregando membros...</S.LoadingMessage>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <S.UserItem 
              key={user.id} 
              onClick={() => toggleUserSelection(user)}
              isSelected={isUserSelected(user)}
            >
              <S.UserImage>
                <IconFetch 
                  idUser={user.id}
                  name={user.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}
                />
              </S.UserImage>
              <S.UserInfo>
                <S.UserName>{user.name}</S.UserName>
                <S.UserEmail>{user.email}</S.UserEmail>
              </S.UserInfo>
              {isUserSelected(user) && (
                <S.CheckIcon>
                  <FaCheck color='#8B99AE'/>
                </S.CheckIcon>
              )}
            </S.UserItem>
          ))
        ) : (
          <S.NoResults>Nenhum usuário encontrado</S.NoResults>
        )}
      </S.UsersList>

      {/* Botão Confirmar */}
      <S.ButtonContainer>
        <ButtonLight
          text="Confirmar"
          onClick={handleConfirm}
          disabled={loading}
        />
      </S.ButtonContainer>
    </S.SearchContainer>
  );
};

export default AddPeopleModalContent;