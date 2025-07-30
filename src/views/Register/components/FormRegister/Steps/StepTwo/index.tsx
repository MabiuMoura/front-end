import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import ButtonLight from '../../../../../../components/Buttons/ButtonLight';
import { InputRegister } from '../../../../../../components/Inputs/InputRegister';
import * as S from './styles';
import { stepTwoSchemaRegister } from "../../../../../../shared/constants/schemas";
import { SearchableSelectRegister } from "../../../../../../components/Selects/SearchableSelect";

interface Option {
  value: string;
  label: string;
}

interface StepTwoProps {
  onNext: (data: any) => void;
  onPrev: () => void;
  universityOptions: Option[];
  courseOptions: Option[];
}

const StepTwo: React.FC<StepTwoProps> = ({
  onNext,
  onPrev,
  universityOptions,
  courseOptions,
}) => {
  const stepTwoForm = useForm({
    resolver: zodResolver(stepTwoSchemaRegister)
  });

  const handleSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <S.FormContainer>
      <S.ProgressBar>
        <S.Step active={true}>1</S.Step>
        <S.StepLine active={true} />
        <S.Step active={true}>2</S.Step>
        <S.StepLine />
        <S.Step>3</S.Step>
      </S.ProgressBar>

      <FormProvider {...stepTwoForm}>
        <form onSubmit={stepTwoForm.handleSubmit(handleSubmit)}>
          <S.FormGrid>
            <InputRegister 
              label="Título"
              register={stepTwoForm.register('college_degree')}
              error={stepTwoForm.formState.errors.college_degree}
              placeholder="Digite seu título"
            />

            <SearchableSelectRegister 
              label="Instituição"
              register={stepTwoForm.register('institution')}
              error={stepTwoForm.formState.errors.institution}
              placeholder="Nome da instituição"
              options={universityOptions}
            />

            <SearchableSelectRegister 
              label="Curso"
              register={stepTwoForm.register('course')}
              error={stepTwoForm.formState.errors.course}
              placeholder="Nome do curso"
              options={courseOptions}
            />

            <InputRegister 
              label="Semestre"
              register={stepTwoForm.register('semester')}
              error={stepTwoForm.formState.errors.semester}
              placeholder="Semestre atual"
            />

            <InputRegister 
              label="Matrícula"
              register={stepTwoForm.register('college_id')}
              error={stepTwoForm.formState.errors.college_id}
              placeholder="Número de matrícula"
            />
          </S.FormGrid>
          <S.ButtonGroup>
            <ButtonLight type="button" text={'Anterior'} onClick={onPrev} size='150px'/>
            <ButtonLight type="submit" text={'Próximo'} size='150px'/>
          </S.ButtonGroup>
        </form>
      </FormProvider>
    </S.FormContainer>
  );
};

export default StepTwo;