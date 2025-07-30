import styled from "styled-components";


export const AppShellStyled = styled.div`
  overflow-x: hidden;

  .mantine-bc677j {
    border-bottom: none !important;
  }

  .mantine-we0muc {
    height: 100vh;
    overflow-y: scroll;
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
  }
`;

export const MainContentStyled = styled.div`
  margin-left: 150px; 
  flex: 1; 
  overflow-y: auto; 
  //height:100vh;
  // altura do mainContent = max - navBar - margin-top 
  height:calc(100vh - 65px);
  padding: 16px; 
  @media (min-width: 1441px) {
    margin-left: 90px; 
  }
  // LAPTOP L
    @media (min-width: 1025px) and (max-width: 1440px) {
      margin-left: 90px; 
  }
    // LAPTOP
    @media (min-width: 769px) and (max-width: 1024px) {
      margin-left: 90px; 
  }
    // Tablet
    @media (max-width: 768px) {
      margin-top: 10px;
      margin-left: 0px; 
  }
`;

export const HeaderStyled = styled.div`
  background-color: #0f172a;
`;
