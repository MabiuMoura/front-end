import styled from "styled-components";

export const StyledLastColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  span {
    max-width: 20rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;

export const StyledTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  position: relative;

  table {
    font-family: ${({ theme }) => theme.fonts.inter};
    width: 100%;
    max-width: 100%;
    letter-spacing: 0.5px;
    border-collapse: separate;
    border-spacing: 0 10px;
    border: 2px solid;
    border-color: ${({theme}) => theme.colors.primary_colors.slate700};
    border-radius: 17px;
    overflow: visible;
    background-color: #0f172a;
    padding-left: 1%;
    padding-right: 1%;
  }

  th {
    position: relative;
    text-align: center;
    padding: 0.25rem 0.2rem;
    font-family: ${({theme})=> theme.fonts.poppins};
    font-weight: 500;
    color:${({theme})=> theme.colors.primary_colors.lilac};

    &:not(:last-child)::after {
      content: "";
      display: inline-block;
      width: 1px;
      height: 1.5em;
      background-color: ${({theme}) => theme.colors.primary_colors.slate700}; 
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  tbody {
    tr {
      background-color: #1e293b;
      color: white;
      transition: background-color 0.3s ease;
      font-family: ${({theme})=> theme.fonts.poppins};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary_colors.blue200};
      }

      td {
        //padding: 1.42rem;
        padding: 0.2rem 0.5rem;
        height: 4rem;
        font-size: small;
        font-weight: 400;
        text-align: center;
        max-width: 30rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      td:first-child {
        padding-left: 20px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 6%;
        overflow: visible;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #141d2f; 
  border-radius: 8px;
  color: ${({theme}) => theme.colors.neutral_colors.white}; 

  .pagination-items {
    padding-left: 16px;
    font-size: 14px;
    color:${({theme}) => theme.colors.primary_colors.lilac}; 
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-button {
    background-color: #334155; 
    border: 1px solid ${({theme}) => theme.colors.primary_colors.slate700}; 
    border-radius: 4px;
    padding: 6px 12px;
    color:${({theme}) => theme.colors.neutral_colors.white}; 
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: ${({theme}) => theme.colors.primary_colors.slate700}; 
    }

    &:disabled {
      background-color: #2d3748;
      color: #6b7280;
      cursor: not-allowed;
    }
  }

  .pagination-pages {
    display: flex;
    gap: 4px;
  }

  .page-number {
    background-color:${({theme}) => theme.colors.primary_colors.slate700}; 
    border: 1px solid ${({theme}) => theme.colors.primary_colors.slate700}; 
    border-radius: 4px;
    padding: 6px 12px;
    color:${({theme}) => theme.colors.neutral_colors.white}; 
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background-color:${({theme}) => theme.colors.primary_colors.blue800}; 

    }

    &:hover:not(.active) {
      background-color:${({theme}) => theme.colors.primary_colors.slate700}; 
    }
  }

  .pagination-size {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 16px;
  }

  .pagination-size-selector {
    padding: 6px 8px;
    border: 1px solid #475569;
    border-radius: 4px;
    background-color: #334155;
    color: ${({theme}) => theme.colors.neutral_colors.white}; 
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  .pagination-size-label {
    font-size: 14px;
    color:${({theme}) => theme.colors.primary_colors.lilac}; 
  }
`;