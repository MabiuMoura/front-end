import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import ButtonLight from '../../../../../../components/Buttons/ButtonLight';
import { InputRegister } from '../../../../../../components/Inputs/InputRegister';
import * as S from './styles';
import { stepThreeSchemaRegister } from "../../../../../../shared/constants/schemas";

interface StepThreeProps {
  onSubmit: (data: any) => void;
  onPrev: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onSubmit, onPrev }) => {
  const stepThreeForm = useForm({
    resolver: zodResolver(stepThreeSchemaRegister)
  });

  const { watch, setValue } = stepThreeForm;
  const zipCode = watch('zip_code');

  const fetchAddress = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setValue('street', data.logradouro);
          setValue('distric', data.bairro);
          setValue('city', data.localidade);
          setValue('state', data.uf);
          setValue('country', 'Brasil');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  useEffect(() => {
    if (zipCode) {
      fetchAddress(zipCode);
    }
  }, [zipCode]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <S.FormContainer>
      <S.ProgressBar>
        <S.Step active={true}>1</S.Step>
        <S.StepLine active={true} />
        <S.Step active={true}>2</S.Step>
        <S.StepLine active={true} />
        <S.Step active={true}>3</S.Step>
      </S.ProgressBar>

      <FormProvider {...stepThreeForm}>
        <form onSubmit={stepThreeForm.handleSubmit(handleSubmit)}>
          <S.FormGrid>
            <InputRegister 
              mask="99999-999"
              label="CEP"
              register={stepThreeForm.register('zip_code')}
              error={stepThreeForm.formState.errors.zip_code}
              placeholder="00000-000"
            />

            <InputRegister 
              label="Endereço"
              register={stepThreeForm.register('street')}
              error={stepThreeForm.formState.errors.street}
              placeholder="Rua, Avenida, etc"
            />

            <InputRegister 
              label="Número"
              register={stepThreeForm.register('house_number')}
              error={stepThreeForm.formState.errors.house_number}
              placeholder="Número"
            />

            <InputRegister 
              label="Bairro"
              register={stepThreeForm.register('distric')}
              error={stepThreeForm.formState.errors.distric}
              placeholder="Bairro"
            />

            <InputRegister 
              label="Cidade"
              register={stepThreeForm.register('city')}
              error={stepThreeForm.formState.errors.city}
              placeholder="Cidade"
            />

            <InputRegister 
              label="Estado"
              register={stepThreeForm.register('state')}
              error={stepThreeForm.formState.errors.state}
              placeholder="Estado"
            />

            <InputRegister 
              label="País"
              register={stepThreeForm.register('country')}
              error={stepThreeForm.formState.errors.country}
              placeholder="País"
            />
          </S.FormGrid>
          <S.ButtonGroup>
            <ButtonLight type="button" text={'Anterior'} onClick={onPrev} size='150px'/>
            <ButtonLight type="submit" text={'Finalizar Cadastro'}/>
          </S.ButtonGroup>
        </form>
      </FormProvider>
    </S.FormContainer>
  );
};

export default StepThree;