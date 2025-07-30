import React, { useState, useEffect } from 'react';
import {
  Container,
  SearchInput,
  ButtonsContainer,
  SearchIcon,
  SearchContainer,
  SuggestionsList,
  SuggestionItem,
} from './styles';
import ButtonDark from '../../Buttons/ButtonDark';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface SearchFilterProps {
  onSearch: (query: string) => Promise<void>;
  data: any[];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilterRoot: React.FC<SearchFilterProps> = ({ onSearch, data, isModalOpen, setIsModalOpen  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  //const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (searchQuery) {
  //     const filteredSuggestions = data.filter(item => {
  //       if ('Name' in item) {
  //         return item.Name.toLowerCase().includes(searchQuery.toLowerCase());
  //       } else if ('Title' in item) {
  //         return item.Title.toLowerCase().includes(searchQuery.toLowerCase());
  //       }
  //       return false;
  //     });
  //     setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : []);
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchQuery, data]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        await handleSearch('');
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (query.trim() === '') {
        await onSearch('');
      } else {
        await onSearch(query);
      }
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    } finally {
      //setSuggestions([]);
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  // const handleSuggestionClick = async (suggestion: any) => {
  //   const query = suggestion.Name || suggestion.Title;
  //   setSearchQuery(query);
  //   await handleSearch(query);
  // };

  const handleAdd = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Container>
      <SearchContainer>
        <SearchIcon>
          <FaSearch/>
        </SearchIcon>
        <SearchInput
          type="text"
          value={searchQuery}
          placeholder="Pesquisar"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/* {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.Name || suggestion.Title}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )} */}
      </SearchContainer>
      <ButtonsContainer>
        <ButtonDark onClick={() => handleSearch(searchQuery)} disabled={loading}>
          {loading ? 'Pesquisando...' : 'Pesquisar'}
        </ButtonDark>
        <ButtonDark onClick={() => handleAdd()} disabled={loading}>
          Adicionar
          <FaPlus />
        </ButtonDark>
      </ButtonsContainer>
    </Container>
  );
};

export default SearchFilterRoot;
