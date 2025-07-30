import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }

    body, html, #root {
      height: 100%;
      width: 100%;
      position: fixed;
      font-family: ${({ theme }) => theme.fonts.poppins};
      touch-action: none;
    }

    body {
      background: ${({ theme }) => theme.colors.background_colors.backgroundBlue};
      color: ${({ theme }) => theme.colors.neutral_colors.white};
    }
    
    .pointer {
      cursor: pointer
    }

    .react-datepicker {
      background-color: ${({ theme }) => theme.colors.background_colors.backgroundBlue}; 
    }

    .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.background_colors.backgroundBlue}; 
    border-bottom: none; 
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    padding: 8px 0;
  }

  .react-datepicker__current-month {
    font-size: 12px;
    font-family: ${({theme}) => theme.fonts.inter};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.neutral_colors.white};
  }

  .react-datepicker__day-name {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.primary_colors.gray100};
    background-color: ${({ theme }) => theme.colors.secondary_colors.gray_date}; 
    border-radius: 5px;
  }

  .react-datepicker__day{
    color: ${({ theme }) => theme.colors.neutral_colors.white};
    background-color: ${({ theme }) => theme.colors.secondary_colors.gray_date}; 
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary_colors.lilac} !important;
      
    }
  }

  .react-datepicker__navigation-icon::before {
    width: 6px; 
    height: 6px;  
    border-color: ${({ theme }) => theme.colors.neutral_colors.white}; /* Cor da seta */
  }

  .react-datepicker__month-container {
    background-color: ${({ theme }) => theme.colors.background_colors.backgroundBlue}; 
    border-radius: 10px;
  }


  &::-webkit-scrollbar {
    width: 10px; 
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary_colors.blue100}; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary_colors.blue200}; 
    border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primary_colors.lilac}; 
  }
`;