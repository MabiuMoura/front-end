import { useEffect, useRef, useState } from 'react';
import { Asset, User } from '../../../../../shared/constants/interfaces';
import ButtonsModalsPerfil from '../../../../../components/Buttons/ButtonsModalsPerfil';
import * as S from "./styles";
import InputModalTable from '../../../../Research/components/InputModalTable';
import SelectInput from '../../../../../components/Selects/SelectInput';
import { Categorias, Marcas, Filiações } from '../../Mock/data';
import { LaboratoryAsset } from '../../../../../services/endpoints';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetSchema } from "../../../../../shared/constants/schemas";
import { toast } from 'react-toastify';


interface AddAssetModalProps{
    onClose: () => void;
    users?: User[];
    refreshAssets?: () => void;
}  

const AddAssetModal: React.FC<AddAssetModalProps> = ({onClose, users, refreshAssets}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const manufacturerRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const affiliationRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdownOpen = (dropdownName: string) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    const { handleSubmit, control, formState: { errors } } = useForm<Asset>({
        resolver: zodResolver(AssetSchema),
        defaultValues: {
            assetId: "",
            category: "",
            manufacturer: "",
            affiliation: "",
            name: "",
            description: "",   
            user: { id: undefined }
        },
      });

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            categoryRef.current && !categoryRef.current.contains(event.target as Node) &&
            manufacturerRef.current && !manufacturerRef.current.contains(event.target as Node) &&
            affiliationRef.current && !affiliationRef.current.contains(event.target as Node) &&
            userRef.current && !userRef.current.contains(event.target as Node)
          ) {
            setOpenDropdown(null);
          }
        };
      
        if (openDropdown) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [openDropdown]);


    useEffect(() => {
        const fetchCategorys = async () => {
          try {
            /* setAvailableCategorys(Categorias); */
            /* Colocar logica p pegar os campos do back */
          } catch (error) {
            console.error("Erro ao buscar stacks:", error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchCategorys();
      }, []);

      const handleConfirm = async (data: Asset) => {
        const selectedUser = users?.find((user) => user.id === data.user?.id);
        if (!data.category || !data.manufacturer || !data.affiliation || !data.name || !data.description || !data.assetId) {
                /* Colocar logica p alertar sobre os campos */
            return;
        }
        try {
            setIsLoading(true);
            await LaboratoryAsset.createAsset(data);
            toast.success("Patrimônio criado com sucesso!")
            refreshAssets?.();
            onClose();
        } catch (error) {
            console.error("Error creating asset:", error);
            toast.error("Erro ao criar Patrimônio");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault(); 
                handleSubmit(handleConfirm)(); // Ao clicar no enter deve ter a confirmação do form
            }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleSubmit, handleConfirm]);
    

    return (
        <S.AddAssetContainer onSubmit={handleSubmit(handleConfirm)}>
            <S.InputsContainer>
                <S.InputColumn>
                    <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                        <>
                                <SelectInput
                                    containerRef={categoryRef}
                                    isOpen={openDropdown === "category"}
                                    setIsOpen={() => handleDropdownOpen("category")}
                                    label="Categoria"
                                    placeholder="Escolha a Categoria"
                                    options={Categorias}
                                    onOptionSelect={field.onChange}
                                    value={field.value}
                                />
                            <S.ErrorMessage>{errors.category?.message}</S.ErrorMessage>
                        </>
                        )}
                    >
                </Controller>
                <Controller
                        name='manufacturer'
                        control={control}
                        render={({ field }) => (
                            <>
                                    <SelectInput
                                        containerRef={manufacturerRef}
                                        isOpen={openDropdown === "manufacturer"}
                                        setIsOpen={() => handleDropdownOpen("manufacturer")}
                                        label="Marca"
                                        placeholder="Escolha a Marca"
                                        options={Marcas}
                                        onOptionSelect={field.onChange}
                                        value={field.value}
                                    />
                                <S.ErrorMessage>{errors.manufacturer?.message}</S.ErrorMessage>
                            </>
                        )}
                    >
                </Controller>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <>
                            <InputModalTable
                                label = "Nome"
                                placeHolder = 'Digite o nome da Patrimônio'
                                value={field.value}
                                onChange={field.onChange} />
                            <S.ErrorMessage>{errors.name?.message}</S.ErrorMessage>
                        </>
                    )} />
                </S.InputColumn>
                <S.InputColumn>
                <Controller
                    name='affiliation'
                    control={control}
                    render={({ field }) => (
                        <>
                                <SelectInput
                                    containerRef={affiliationRef}
                                    isOpen={openDropdown === "affiliation"}
                                    setIsOpen={() => handleDropdownOpen("affiliation")}
                                    label="Filiação"
                                    placeholder="Escolha a Filiação"
                                    options={Filiações}
                                    onOptionSelect={field.onChange}
                                    value={field.value}
                                />
                            <S.ErrorMessage>{errors.affiliation?.message}</S.ErrorMessage> 
                        </>
                )} />

                <Controller
                    name='user' 
                    control={control}
                    render={({ field }) => (
                        <>
                                <SelectInput
                                    containerRef={userRef}
                                    isOpen={openDropdown === "user"}
                                    setIsOpen={() => handleDropdownOpen("user")}
                                    label="Responsável"
                                    placeholder="Selecione um Responsável"
                                    options={users?.map((user) => ({
                                        label: user.name,
                                        value: user.id,    
                                    })) || []}
                                    onOptionSelect={(selectedId) => field.onChange({ id: selectedId })}
                                    value={field.value?.id || ""}
                                />
                            <S.ErrorMessage>{errors.user?.message}</S.ErrorMessage> 
                        </>
                    )}
                />
                
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <>
                            <InputModalTable
                            label = "Descrição"
                            placeHolder = 'Digite a descrição da Patrimônio'
                            value={field.value}
                            onChange={field.onChange} />
                            <S.ErrorMessage>{errors.description?.message}</S.ErrorMessage>
                        </>
                )} />
                </S.InputColumn>
            </S.InputsContainer>
            <Controller
                name='assetId'
                control={control}
                render={({ field }) => (
                    <>
                        <InputModalTable
                            label = "Tombamento"
                            placeHolder = 'Digite o tombamento da Patrimônio'
                            value={field.value}
                            onChange={field.onChange} />
                        <S.ErrorMessage>{errors.assetId?.message}</S.ErrorMessage>
                    </>
                )} />
            
            <ButtonsModalsPerfil 
                onCancel={onClose} 
                onConfirm={handleSubmit(handleConfirm)} 
                confirmText="Cancelar"
            />
        </S.AddAssetContainer>
    )
}

export default AddAssetModal;