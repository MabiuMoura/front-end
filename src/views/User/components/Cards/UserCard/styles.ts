import styled from "styled-components";


export const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: rgba(30, 41, 59, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
  color: ${({theme}) => theme.colors.primary_colors.gray50};
  
  &:hover {
    opacity: 1;
  }
`;

export const PhotoText = styled.span`
  font-size: 14px;
  margin-top: 8px;
  color: ${({theme}) => theme.colors.primary_colors.gray50};
`;

export const UserPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: ${({theme}) => theme.colors.primary_colors.gray50};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 90px;
  width: 210px;
  height: 210px;
  background-color: #1e293b;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5px;
  align-items: start;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
`;

export const MemberSinceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 1px solid #64748b;
  color: #64748b;
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const TextMedium = styled.span`
  color: #64748B;
  font-size: 15;
`;

export const TextSmall = styled.span`
  color: #475569;
  font-size: 11;
`;