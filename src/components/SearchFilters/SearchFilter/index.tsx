import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  SearchInput,
  SearchIcon,
  SearchContainer,
  SuggestionsList,
  SuggestionItem,
} from './styles';
import { FaSearch } from 'react-icons/fa';

interface SearchFilterProps {
  onSearch: (query: string) => Promise<void>;
  data: any[];
}

const SearchFilterProjects: React.FC<SearchFilterProps> = ({ onSearch, data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = data.filter(item => {
        if ('Name' in item) {
          return item.Name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if ('Title' in item) {
          return item.Title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : []);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        await handleSearch('');
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    try {
      if (query.trim() === '') {
        await onSearch('');
      } else {
        await onSearch(query);
      }
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    } finally {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = async (suggestion: any) => {
    const query = suggestion.Name || suggestion.Title;
    setSearchQuery(query);
    await handleSearch(query);
  };

  

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
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.Name || suggestion.Title}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </SearchContainer>
    </Container>
  );
};

export default SearchFilterProjects;
