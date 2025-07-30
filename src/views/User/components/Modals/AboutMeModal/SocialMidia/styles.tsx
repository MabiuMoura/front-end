import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: ${({theme})=> theme.colors.background_colors.backgroundBlue};
  border-radius: 4px;
`;

export const IconLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 15px;
  width: 130px;
  flex-shrink: 0;
  height: 100%;
  border-right: 1px solid white;
  color: ${({theme})=> theme.colors.neutral_colors.white};
  gap: 16px;
  font-family: Arial, Helvetica, sans-serif;

  border-radius: 4px 0px 0px 4px;

  @media (max-width: px){
    width: 50px;
  }
`;

export const InputLink = styled.input`
  background-color: transparent;
  color: ${({theme})=> theme.colors.neutral_colors.white};
  width: 100%;
  height: 100%;
  border: 0px;
  border-radius: 0px 4px 4px 0px;
  padding-left: 20px;
  padding-right: 20px;

  &:focus {
    outline: 1px solid ${({theme})=> theme.colors.primary_colors.lilac};
  }
`;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
`; 
