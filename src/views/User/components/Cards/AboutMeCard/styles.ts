import styled from "styled-components";
import { FaGithub, FaLinkedin,  } from "react-icons/fa";

export const AboutContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 150px;
  color: ${({ theme }) => theme.colors.primary_colors.lilac};
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: justify;
  gap:15px;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #1e293b;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #334155;
    border-radius: 20px;
  }
`;

export const LinksContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  color: #94a3b8;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: justify;
  justify-content: space-evenly;
  align-items:end;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #1e293b;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #334155;
    border-radius: 20px;
  }
`;

export const LinkItem = styled.div`
  gap:10px;
  border-radius:8px;
  padding:5px;
  a {
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration: none; 
    color: inherit;   
    text-align:center;  
    gap: 10px;  
  }
  
    &:hover{
    background-color:rgb(29, 46, 68);
  }
`

export const GithubIcon = styled(FaGithub)`
  width:25px;
  height:25px;
`

export const LinkedinIcon = styled(FaLinkedin)`
  width:25px;
  height:25px;
`