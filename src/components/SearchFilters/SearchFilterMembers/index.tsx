import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  ButtonsContainer,
  SearchIcon,
  SearchContainer,
  Filter,
  DropdownContainer,
  Icon_AZ,
  OrdinateTitle,
  Icon_ZA,
  Icon_New,
  Icon_Old,
} from "./styles";
import { FaSearch, FaCheck } from "react-icons/fa";
import ButtonOrdinate from "../../Buttons/ButtonOrdinate";
import OrdinateOption from "../../OrdinateOption";
import ButtonDark from "../../Buttons/ButtonDark";

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  onSortChange: (order: string) => void;
  searchQuery?: string;
  backgroundColorButton?: string;
}

const SearchFilterMembers: React.FC<SearchFilterProps> = ({
  onSearch,
  isModalOpen,
  setIsModalOpen,
  selectedOption,
  onSortChange,
  searchQuery,
  backgroundColorButton,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery ?? "");

  useEffect(() => {
    setLocalQuery(searchQuery ?? "");
  }, [searchQuery]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(localQuery);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node))
        return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsModalOpen]);

  const toggleDropdown = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <Container>
      {onSearch && (
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            value={localQuery}
            placeholder="Pesquisar"
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </SearchContainer>
      )}
      <ButtonsContainer>
        {onSearch && (
          <ButtonDark onClick={handleSearchClick}>Pesquisar</ButtonDark>
        )}
        <ButtonOrdinate
          ref={buttonRef}
          onClick={toggleDropdown}
          backgroundColor={backgroundColorButton}
        >
          <Filter />
          {isModalOpen && (
            <DropdownContainer
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <OrdinateOption
                onClick={() => onSortChange("AZ")}
                style={{
                  backgroundColor:
                    selectedOption === "AZ" ? "#1E293B" : "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_AZ />
                <OrdinateTitle>Ordenar por nome A-Z</OrdinateTitle>
                {selectedOption === "AZ" && (
                  <FaCheck style={{ marginLeft: "auto", color: "green" }} />
                )}
              </OrdinateOption>
              <OrdinateOption
                onClick={() => onSortChange("ZA")}
                style={{
                  backgroundColor:
                    selectedOption === "ZA" ? "#1E293B" : "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_ZA />
                <OrdinateTitle>Ordenar por nome Z-A</OrdinateTitle>
                {selectedOption === "ZA" && (
                  <FaCheck style={{ marginLeft: "auto", color: "green" }} />
                )}
              </OrdinateOption>
              <OrdinateOption
                onClick={() => onSortChange("newest")}
                style={{
                  backgroundColor:
                    selectedOption === "newest" ? "#1E293B" : "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_New />
                <OrdinateTitle>Ordenar por mais novos</OrdinateTitle>
                {selectedOption === "newest" && (
                  <FaCheck style={{ marginLeft: "auto", color: "green" }} />
                )}
              </OrdinateOption>
              <OrdinateOption
                onClick={() => onSortChange("oldest")}
                style={{
                  backgroundColor:
                    selectedOption === "oldest" ? "#1E293B" : "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_Old />
                <OrdinateTitle>Ordenar por mais antigos</OrdinateTitle>
                {selectedOption === "oldest" && (
                  <FaCheck style={{ marginLeft: "auto", color: "green" }} />
                )}
              </OrdinateOption>
            </DropdownContainer>
          )}
        </ButtonOrdinate>
      </ButtonsContainer>
    </Container>
  );
};

export default SearchFilterMembers;
