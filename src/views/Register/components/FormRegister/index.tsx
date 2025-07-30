import React, { useEffect, useState } from 'react';
import { useAuthUser } from '../../../../context/authContext';
import StepOne from './Steps/StepOne';
import StepThree from './Steps/StepThree';
import StepTwo from './Steps/StepTwo';
import { MeAuth, UpdateFirstLoginRequest } from '../../../../shared/constants/interfaces';
import { users } from '../../../../services/endpoints';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/constants/enums';

const RegisterForm: React.FC = () => {
  const { me } = useAuthUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState<MeAuth | null>(null);
  const navigate = useNavigate();

  const [universityOptions, setUniversityOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [courseOptions, setCourseOptions] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
      const loadInitialOptions = async () => {
        try {
          const universitiesData = await users.searchInfo("university", "");
          const formattedUniversities = universitiesData.map((uni: string) => ({
            value: uni,
            label: uni
          }));
          setUniversityOptions(formattedUniversities);
  
          const coursesData = await users.searchInfo("course", "");
          const formattedCourses = coursesData.map((course: string) => ({
            value: course,
            label: course
          }));
          setCourseOptions(formattedCourses);
        } catch (error) {
          console.error("Erro ao carregar opções iniciais:", error);
        }
      };
  
      if (step === 2) {
        loadInitialOptions();
      }
    }, [step]);

  const handleStepOneNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStepTwoNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStepThreeSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    const { fullName, email, birthDate, cpf, ...rest } = finalData;

    const formattedData: UpdateFirstLoginRequest = {
      rg: rest.rg,
      phone_number: rest.phone,
      address: {
        country: rest.country,
        state: rest.state,
        city: rest.city,
        zip_code: rest.zip_code,
        distric: rest.distric,
        street: rest.street,
        house_number: rest.house_number
      },
      institutional_info: {
        institution: rest.institution,
        college_degree: rest.college_degree,
        semester: rest.semester,
        college_id: rest.college_id,
        course: rest.course
      }
    };

    if (userData?.id) {
      users
        .updateFirstLogin(userData.id, formattedData)
        .then(() => {
          navigate(RoutePath.USER, { replace: true });
        })
        .catch((error) => {
          console.error("Erro ao enviar dados:", error);
        });
    } else {
      console.error("ID do usuário não encontrado.");
    }
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await me();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [me]);

  const formatDate = (dateString: string) => dateString.split('T')[0];

  const initialData = userData ? {
    fullName: userData.name,
    email: userData.email,
    birthDate: userData.birthday ? formatDate(userData.birthday) : '',
    cpf: userData.cpf
  } : {
    fullName: '',
    email: '',
    birthDate: '',
    cpf: ''
  };

  return (
    <>
      {step === 1 && (
        <StepOne 
          onNext={handleStepOneNext} 
          initialData={initialData}
          disabledFields={['fullName', 'email', 'birthDate', 'cpf']}
        />
      )}
      {step === 2 && (
         <StepTwo 
         onNext={handleStepTwoNext} 
         onPrev={handlePrevStep}
         universityOptions={universityOptions}
         courseOptions={courseOptions}
       />
      )}
      {step === 3 && (
        <StepThree 
          onSubmit={handleStepThreeSubmit} 
          onPrev={handlePrevStep} 
        />
      )}
    </>
  );
};

export default RegisterForm;