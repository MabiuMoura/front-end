import styled from 'styled-components';

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  position: relative;
`;

export const Label = styled.label`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

interface SelectInputProps {
  hasError?: boolean;
}

export const SelectInput = styled.input<SelectInputProps>`
  width: 100%;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid ${({theme, hasError}) => 
    hasError 
      ? theme.colors.alert_colors.errorModal 
      : theme.colors.primary_colors.gray100
  };
  background-color: ${({theme}) => theme.colors.primary_colors.gray};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ArrowIconProps {
  isOpen: boolean;
}

export const ArrowIcon = styled.div<ArrowIconProps>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) ${({isOpen}) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  color: ${({theme}) => theme.colors.primary_colors.gray100};
  transition: transform 0.2s ease;
  pointer-events: none;
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: ${({theme}) => theme.colors.primary_colors.gray};
  border: 1px solid ${({theme}) => theme.colors.primary_colors.gray100};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;


  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.secondary_colors.gray300}; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary_colors.gray200}; 
    border-radius: 10px;
  }
`;

export const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 10px;
  &:hover {
    background-color: ${({theme}) => theme.colors.primary_colors.gray100};
  }
`;

export const NoOptions = styled.div`
  padding: 10px;
  color: ${({theme}) => theme.colors.primary_colors.gray100};
  text-align: center;
  font-size: 10px;
`;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 0.8rem;
  margin-top: 5px;
`;