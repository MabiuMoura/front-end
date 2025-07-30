import styled from "styled-components";
import { CiFilter } from "react-icons/ci";
import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { device } from "../../../shared/configs/device.config";



export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1%;
  position: relative;
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    gap: 10px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    gap: 10px;
  }

  @media (max-width: ${device.mobileSmall}) {
    gap: 10px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1%;
  border-bottom: 2px solid #9a9ea5;
  padding-bottom: 0.5%;
  position: relative;
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 18px;
  color: #9a9ea5;

  svg {
    width: 18px;
    height: auto;
    stroke-width: 0.1px;
    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      width: 16px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      width: 14px;
    }

    @media (max-width: ${device.mobileSmall}) {
      width: 14px;
    }
  }
  
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #9a9ea5;
  font-size: 15px;
  font-weight: 300;

  &::placeholder {
    color: #9a9ea5;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 14px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 13px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 13px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 16px;
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #1e293b;
  border: 1px solid #9a9ea5;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 4px 0 0 0;
  z-index: 10;
  list-style: none;
`;

export const SuggestionItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  color: #9a9ea5;
  background-color: #1e293b;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e3a8a;
  }
`;

export const Filter = styled(CiFilter)`
  @media (min-width: ${device.desktop}) {
    font-size:28px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size:25px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size:22px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size:20px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size:18px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size:16px;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size:16px;
  }

`
export const DropdownContainer = styled.div`
  display:flex;
  flex-direction:column;
  position: absolute;
  gap:5px;
  top: 100%;
  margin-top:10px;
  margin-right:210px;
  left: 100;
  background-color: #1e293b;
  border: 1px solid #9a9ea5;
  border-radius: 8px;
  width:260px;
  z-index: 10;
  padding: 10px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      width:240px;
      margin-right:195px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      width:220px;
      margin-right:180px;
      padding: 7px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      width:200px;
      margin-right:165px;
      padding: 6px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      width:180px;
      margin-right:150px;
      padding: 5px;
    }

    @media (max-width: ${device.mobileSmall}) {
      width:180px;
      margin-right:150px;
      padding: 5px;
    }
`;

export const Icon_AZ = styled(TbSortAscendingLetters)`
  color: #94A3B8;
  font-size: 29px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      font-size: 27px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size: 25px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size: 23px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-size: 22px;
    }

    @media (max-width: ${device.mobileSmall}) {
      font-size: 22px;
    }
`

export const OrdinateTitle = styled.p`
  color: #94A3B8;
  font-size: 15px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 14px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size: 13px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size: 12px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-size: 11px;
    }

    @media (max-width: ${device.mobileSmall}) {
      font-size: 11px;
    }
`


export const Icon_ZA = styled(TbSortDescendingLetters)`
  color: #94A3B8;
  font-size: 29px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      font-size: 27px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size: 25px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size: 23px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-size: 22px;
    }

    @media (max-width: ${device.mobileSmall}) {
      font-size: 22px;
    }
`

export const Icon_New = styled(TbSortAscendingNumbers)`
  color: #94A3B8;
  font-size: 29px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      font-size: 27px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size: 25px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size: 23px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-size: 22px;
    }

    @media (max-width: ${device.mobileSmall}) {
      font-size: 22px;
    }
`

export const Icon_Old = styled(TbSortDescendingNumbers)`
  color: #94A3B8;
  font-size: 29px;
  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
      font-size: 27px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
      font-size: 25px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
      font-size: 23px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
      font-size: 22px;
    }

    @media (max-width: ${device.mobileSmall}) {
      font-size: 22px;
    }
`