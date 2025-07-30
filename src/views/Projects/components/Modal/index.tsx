import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import InputModal from '../../../../components/Inputs/InputModals';
import ButtonsProjectModal from "../ButtonsSteps";
import { AddButton, AreaContainer, Container, GroupInputContainer, GroupItem, GroupsList } from './styles';
import { FaPlus, FaTrash } from "react-icons/fa";
import { ModalGeneral } from "../../../../components/Modals/ModalGeneral";
import AddPeopleModalContent from "./AddPeopleModal";
import { ProjectRequest, User } from '../../../../shared/constants/interfaces';
import { projectsEndpoint } from "../../../../services/endpoints";
import { toast } from "react-toastify";

const projectSchema = z.object({
    name: z.string().min(3, "Nome do projeto deve ter no mínimo 3 caracteres"),
    description: z.string().optional(),
    groups: z.array(z.string()).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface GroupMembers {
    [groupId: string]: User[];
}

interface AddProjectModalProps {
    onClose: () => void;
    onSubmit: (data: ProjectFormValues & { groupMembers: GroupMembers }) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentGroup, setCurrentGroup] = useState('');
    const [groups, setGroups] = useState<string[]>([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [groupMembers, setGroupMembers] = useState<GroupMembers>({});

    const {
        control,
        formState: { errors },
        trigger,
        handleSubmit,
        setValue,
        getValues,
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        mode: 'onBlur',
        defaultValues: {
            groups: [],
        }
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleAddGroup = () => {
        if (currentGroup.trim()) {
            const updatedGroups = [...groups, currentGroup.trim()];
            setGroups(updatedGroups);
            setValue('groups', updatedGroups);
            setCurrentGroup('');
        }
    };

    const handleRemoveGroup = (index: number) => {
        const groupToRemove = groups[index];
        const updatedGroups = groups.filter((_, i) => i !== index);
        setGroups(updatedGroups);
        setValue('groups', updatedGroups);

        const updatedGroupMembers = { ...groupMembers };
        delete updatedGroupMembers[groupToRemove];
        setGroupMembers(updatedGroupMembers);
    };

    const handleNext = async () => {
        if (currentStep === 3) {
            const formData = getValues();

            const apiFormattedData: ProjectRequest = {
                name: formData.name,
                description: formData.description || "",
            };

            if (groups.length > 0) {
                apiFormattedData.groups = groups.map(groupName => {
                    const groupData = {
                        name: groupName
                    };

                    const members = groupMembers[groupName] || [];
                    if (members.length > 0) {
                        return {
                            ...groupData,
                            members: members.map(member => ({ id: member.id }))
                        };
                    }

                    return groupData;
                });
            }
            console.log("Dados formatados para API:", JSON.stringify(apiFormattedData, null, 2));

            await projectsEndpoint.createProject(apiFormattedData)
                .then((response) => {
                    console.log("RESPONSE PROJECT: ", response);
                    toast.success("Projeto criado com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao enviar dados:", error);
                    toast.error("Erro ao criar projeto");
                });

            handleSubmit((data) => {
                onSubmit({
                    ...data,
                    groupMembers
                });

            })();

            return;
        }


        switch (currentStep) {
            case 1:
                const isValid = await trigger(['name', 'description']);
                if (isValid) {
                    setCurrentStep(prev => prev + 1);
                }
                break;
            case 2:
                setCurrentStep(prev => prev + 1);
                break;
        }
    };

    const handleConfirmMembers = (confirmedMembers: GroupMembers) => {
        setGroupMembers(confirmedMembers); 
        closeGroupModal(); 
      };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleGroupAction = (group: string) => {
        setSelectedGroup(group);
        setShowGroupModal(true);
    };

    const closeGroupModal = () => {
        setShowGroupModal(false);
        setSelectedGroup('');
    };

    const handleUserSelection = (user: User, groupId: string, isSelected: boolean) => {
        setGroupMembers(prev => {
            const currentGroupMembers = prev[groupId] || [];

            let updatedMembers;
            if (isSelected) {
                updatedMembers = [...currentGroupMembers, user];
            } else {
                updatedMembers = currentGroupMembers.filter(u => u.id !== user.id);
            }

            return {
                ...prev,
                [groupId]: updatedMembers
            };
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <AreaContainer>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <InputModal
                                    label="Nome do Projeto"
                                    {...field}
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <InputModal
                                    multiline
                                    height='17vh'
                                    label="Descrição do Projeto"
                                    {...field}
                                    error={errors.description?.message}
                                />
                            )}
                        />
                    </AreaContainer>
                );
            case 2:
                return (
                    <AreaContainer>
                        <GroupInputContainer>
                            <InputModal
                                label="Grupos"
                                value={currentGroup}
                                onChange={(e) => setCurrentGroup(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddGroup();
                                    }
                                }}
                            />
                            <AddButton type="button" onClick={handleAddGroup} style={{ marginTop: '24px' }}>
                                <FaPlus />
                            </AddButton>
                        </GroupInputContainer>

                        <GroupsList>
                            {groups.map((group, index) => (
                                <GroupItem key={index}>
                                    {group}
                                    <FaTrash type="button" onClick={() => handleRemoveGroup(index)} color="#94A3B8" cursor="pointer" />
                                </GroupItem>
                            ))}
                        </GroupsList>
                    </AreaContainer>
                );
            case 3:
                return (
                    <AreaContainer>
                        <h4 style={{ color: '#CBD5E1', margin: '0 0 10px 0', fontSize: '14px' }}>ADICIONAR PESSOAS</h4>
                        <GroupsList>
                            {groups.map((group, index) => {
                                const memberCount = groupMembers[group]?.length || 0;
                                return (
                                    <GroupItem key={index}>
                                        <div>
                                            {group}
                                            {memberCount > 0 && (
                                                <span style={{ color: '#94A3B8', fontSize: '12px', marginLeft: '8px' }}>
                                                    {memberCount} {memberCount === 1 ? 'membro' : 'membros'}
                                                </span>
                                            )}
                                        </div>
                                        <AddButton
                                            type="button"
                                            onClick={() => handleGroupAction(group)}
                                            style={{ marginLeft: 'auto', marginTop: '0' }}
                                        >
                                            <FaPlus />
                                        </AddButton>
                                    </GroupItem>
                                );
                            })}
                        </GroupsList>
                        {groups.length === 0 && (
                            <div style={{ color: '#94A3B8', textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
                                Nenhum grupo criado ainda.
                            </div>
                        )}
                    </AreaContainer>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Container onSubmit={handleFormSubmit}>
                {renderStep()}
                <ButtonsProjectModal
                    onCancel={onClose}
                    onConfirm={handleNext}
                    onBack={currentStep > 1 ? handlePrevious : undefined}
                    showBack={currentStep > 1}
                    buttonOneTitle="CANCELAR"
                    buttonSecondTitle={currentStep === 3 ? "FINALIZAR" : "PRÓXIMO"}
                    disabled={isLoading}
                />
            </Container>

            <ModalGeneral
                title={`Adicionar Pessoas`}
                show={showGroupModal}
                onClose={closeGroupModal}
                closeOnOutsideClick={false}
                modalId="add-people-modal">


                <AddPeopleModalContent
                    onSelectUser={handleUserSelection}
                    selectedGroupId={selectedGroup}
                    initialGroupMembers={groupMembers}
                    onConfirm={handleConfirmMembers}
                />
            </ModalGeneral>
        </>
    );
};

export default AddProjectModal;