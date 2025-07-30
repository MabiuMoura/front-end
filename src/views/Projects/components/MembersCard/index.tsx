import React from 'react';
import * as S from "./styles";


interface MemberGroupProps {
  userId: string;
  fullName: string;
}

const MemberGroup: React.FC<MemberGroupProps> = ({ userId, fullName }) => {
  const getTwoFirstNames = (name: string): string => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0]} ${names[1]}`;
    }
    return name;
  };

  const twoFirstNames = getTwoFirstNames(fullName);

  return (
    <S.MemberContainer>
      <S.UserPhoto 
        userId={userId} 
        name={fullName} 
        style={{ 
          zIndex: 1,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
        }} 
      />
      <S.ContainerName>
        <S.NameText>{twoFirstNames}</S.NameText>
      </S.ContainerName>
    </S.MemberContainer>
  );
};

export default MemberGroup;