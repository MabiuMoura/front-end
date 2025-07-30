import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import ButtonLight from '../../../../../../components/Buttons/ButtonLight';
import { InputRegister } from '../../../../../../components/Inputs/InputRegister';
import * as S from './styles';
import { stepOneSchemaRegister } from "../../../../../../shared/constants/schemas";

interface StepOneProps {
  onNext: (data: any) => void;
  initialData: {
    fullName: string;
    email: string;
    birthDate: string;
    cpf: string;
    rg?: string;
    phone?: string;
  };
  disabledFields: string[];
}


const StepOne: React.FC<StepOneProps> = ({ onNext, initialData, disabledFields }) => {
  const stepOneForm = useForm({
    resolver: zodResolver(stepOneSchemaRegister),
    defaultValues: initialData
  });

  useEffect(() => {
    stepOneForm.reset(initialData);
  }, [initialData]);

  const handleSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <S.FormContainer>
      <S.StepsWrapper>
        <S.ProgressBar>
          <S.Step active={true}>1</S.Step>
          <S.StepLine />
          <S.Step>2</S.Step>
          <S.StepLine />
          <S.Step>3</S.Step>
        </S.ProgressBar>
      </S.StepsWrapper>

      <FormProvider {...stepOneForm}>
        <form onSubmit={stepOneForm.handleSubmit(handleSubmit)}>
          <S.FormGrid>
            <InputRegister 
              label="Nome Completo"
              register={stepOneForm.register('fullName')}
              error={stepOneForm.formState.errors.fullName}
              placeholder="Digite seu nome completo"
              disabled={disabledFields.includes('fullName')}
            />

            <InputRegister 
              label="Data de Nascimento"
              type="date"
              register={stepOneForm.register('birthDate')}
              error={stepOneForm.formState.errors.birthDate}
              disabled={disabledFields.includes('birthDate')}
            />

            <InputRegister 
              label="E-mail"
              type="email"
              register={stepOneForm.register('email')}
              error={stepOneForm.formState.errors.email}
              placeholder="Digite seu e-mail"
              disabled={disabledFields.includes('email')}
            />

            <InputRegister 
              mask="999.999.999-99"
              label="CPF"
              register={stepOneForm.register('cpf')}
              error={stepOneForm.formState.errors.cpf}
              placeholder="000.000.000-00"
              disabled={disabledFields.includes('cpf')}
            />

            <InputRegister 
              mask="9999999999-9"
              label="RG"
              register={stepOneForm.register('rg')}
              error={stepOneForm.formState.errors.rg}
              placeholder="Digite seu RG"
            />

            <InputRegister 
              mask="(99) 99999-9999"
              label="Celular (WhatsApp)"
              type="tel"
              register={stepOneForm.register('phone')}
              error={stepOneForm.formState.errors.phone}
              placeholder="(00) 00000-0000"
            />
          </S.FormGrid>
          <S.ButtonGroup>
            <ButtonLight type="submit" text={'Próximo'}/>
          </S.ButtonGroup>
        </form>
      </FormProvider>
    </S.FormContainer>
  );
};

export default StepOne;