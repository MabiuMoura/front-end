import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { FaCheck } from "react-icons/fa";
import InputModal from "../../Inputs/InputModals";
import ButtonLight from "../../Buttons/ButtonLight";
import ButtonsModalsPerfil from "../../Buttons/ButtonsModalsPerfil";

interface SelectNameIconProps {
  onSelectItem?: (selectedItems: string[]) => void;
  iconList?: string[];
  titleList: string[];
  presetSelectedItems?: string[];
  serachInput?: boolean;
  closeModal: () => void;
}

const SelectNameIcon: React.FC<SelectNameIconProps> = ({
  onSelectItem,
  iconList,
  titleList,
  presetSelectedItems = [],
  serachInput = true,
  closeModal,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] =
    useState<string[]>(presetSelectedItems); // Lista de itens selecionados

  useEffect(() => {
    setItems(titleList);
  }, [titleList]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = searchQuery.trim()
    ? items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aSelected = selectedItems.includes(a);
    const bSelected = selectedItems.includes(b);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  const toggleItemSelection = (item: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const sortedItemsWithIcons = filteredItems
  .map((item, index) => ({
    item,
    icon: iconList?.[index] || "", // Usa optional chaining para evitar erro se iconList for undefined
  }))
  .sort((a, b) => {
    const aSelected = selectedItems.includes(a.item);
    const bSelected = selectedItems.includes(b.item);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });
  const handleConfirm = () => {
    if (onSelectItem) {
      onSelectItem(selectedItems); // Passando os itens selecionados
    }
  };

  return (
    <S.SearchContainer>
      {serachInput ? <S.FilterInput>
        <InputModal
          placeholder="Pesquise o item"
          value={searchQuery}
          onChange={handleInputChange}
          width="100%"
        />
      </S.FilterInput> : null}

      <S.UsersList>
        {sortedItemsWithIcons.length > 0 ? (
          sortedItemsWithIcons.map(({ item, icon }) => (
            <S.UserItem
              key={item}
              onClick={() => toggleItemSelection(item)}
              isSelected={selectedItems.includes(item)}
            >
              {iconList ? (
                <S.UserImage>
                  <img
                    src={icon}
                    alt="Ícone"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </S.UserImage>
              ) : null}
              <S.UserInfo>
                <S.UserName>{item}</S.UserName>
              </S.UserInfo>
              {selectedItems.includes(item) && (
                <S.CheckIcon>
                  <FaCheck color="#8B99AE" />
                </S.CheckIcon>
              )}
            </S.UserItem>
          ))
        ) : (
          <S.NoResults>Nenhum item encontrado</S.NoResults>
        )}
      </S.UsersList>

      <S.ButtonContainer>
        <ButtonsModalsPerfil onCancel={closeModal} onConfirm={handleConfirm} />
      </S.ButtonContainer>
    </S.SearchContainer>
  );
};

export default SelectNameIcon;
