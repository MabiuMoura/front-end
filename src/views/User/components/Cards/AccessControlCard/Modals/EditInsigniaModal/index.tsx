import { useEffect, useState } from "react";
import { insignia } from "../../../../../../../services/endpoints";
import { Column, ModalContent } from "./styles";
import { Insignia } from "../../../../../../../shared/constants/interfaces";
import defaultIcon from "../../../../../../../assets/search.svg";
import { toast } from "react-toastify";
import SelectNameIcon from "../../../../../../../components/Selects/SelectNameIcon";

interface EditInsigniaModalInterface {
  insignias: Insignia[];
  id: string;
  closeModal: () => void;
  insigniasUpdate: (updatedInsignias: Insignia[]) => void;
}

const EditInsigniaModal: React.FC<EditInsigniaModalInterface> = ({
  insignias,
  id,
  closeModal,
  insigniasUpdate,
}) => {
  const [items, setItems] = useState<Insignia[]>([]);
  const [iconList, setIconList] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allInsignias, setAllInsignias] = useState<Insignia[]>([]);

  useEffect(() => {
    const fetchAllInsignias = async () => {
      setLoading(true);
      try {
        const response = await insignia.getInsignias();
        setAllInsignias(response.items);
        const icons = await Promise.all(
          response.items.map(async (insignias: Insignia) => {
            let blob;

            try {
              blob = await insignia.getIcon(insignias.icon);
            } catch {
              blob = null;
            }
            return blob ? URL.createObjectURL(blob) : defaultIcon;
          })
        );

        setIconList(icons);
        setItems(response.items);

        const selectedNames = insignias.map((insignia) => insignia.name);
        setSelectedItems(selectedNames);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllInsignias();
  }, []);

  const handleSelectItems = async (selectedItems: string[]) => {
    try {
      const selectedIds = {
        insignias: items
          .filter((insignia) => selectedItems.includes(insignia.name))
          .map((insignia) => ({ id: insignia.id })),
      };

      await insignia.updateInsignias(id, selectedIds);

      const updatedInsignias = allInsignias.filter((insignia) =>
        selectedIds.insignias.some(
          (selectedId) => selectedId.id === insignia.id
        )
      );
      insigniasUpdate(updatedInsignias);
      toast.success("Insígnias atualizadas com sucesso!");
      closeModal();
    } catch (error) {
      toast.error("Erro ao atualizar insígnias");
    }
  };

  return loading ? (
    <div> Loading...</div>
  ) : (
    <ModalContent>
      <Column>
        <SelectNameIcon
          titleList={items.map((item) => item.name)}
          iconList={iconList}
          presetSelectedItems={selectedItems}
          onSelectItem={handleSelectItems}
          closeModal={closeModal}
        />
      </Column>
    </ModalContent>
  );
};

export default EditInsigniaModal;
