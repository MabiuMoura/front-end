import { Asset } from '../../../../../shared/constants/interfaces';
import ButtonsModalsPerfil from '../../../../../components/Buttons/ButtonsModalsPerfil';
import * as S from "./styles";
import { LaboratoryAsset } from '../../../../../services/endpoints';
import { toast } from 'react-toastify';

interface RemoveAssetModalProps{
    onClose: () => void;
    selectedAsset: Asset;
    refreshAsset?: () => void;
}  

const RemoveAssetModal: React.FC<RemoveAssetModalProps> = ({onClose, selectedAsset, refreshAsset}) => {

    const handleConfirm = async () => {
        try {
            await LaboratoryAsset.removeAsset(selectedAsset.id);
            onClose();
            toast.success("Patrimônio apagado com sucesso!");
            refreshAsset?.();
        } catch (error) {
            console.error("Erro ao apagar patrimônio:", error);
            toast.error("Erro ao apagar patrimônio.");
        }
    };

    return (
        <S.DeleteAssetContainer>
            <S.Message>
                Tem certeza de que deseja remover o (a) patrimônio (a) <strong>{selectedAsset.name}</strong>?
            </S.Message> 
                   
            <ButtonsModalsPerfil 
                onCancel={onClose} 
                onConfirm={handleConfirm} 
                buttonOneTitle="Cancelar"
                buttonSecondTitle="Confirmar"
            />
        </S.DeleteAssetContainer>
    )
    };

export default RemoveAssetModal;
