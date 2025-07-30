import styled from 'styled-components';
import { ProfilePicture } from '../../../../components/ProfilePictureUserId';

export const MemberContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 120px;
`;

export const UserPhoto = styled(ProfilePicture)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({theme})=> theme.colors.primary_colors.blue800};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #666;
  z-index: 1;
`;


export const ContainerName = styled.div`
  background-color:${({theme})=> theme.colors.primary_colors.blue800};
  border-radius: 20px;
  padding: 12px 16px;
  margin-top: -20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 120%;
  z-index: 2;
`;

export const NameText = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: ${({theme})=> theme.colors.neutral_colors.white};
`;
