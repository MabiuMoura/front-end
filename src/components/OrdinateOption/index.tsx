import React, { HTMLAttributes } from 'react';
import { OrdinateContainer } from './styles';

interface OrdinateOptionProps extends HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const OrdinateOption: React.FC<OrdinateOptionProps> = ({ onClick, children, disabled, ...rest }) => {
  return (
    <OrdinateContainer 
      onClick={disabled ? undefined : onClick} 
      {...rest}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...rest.style,
      }}
    >
      {children}
    </OrdinateContainer>
  );
};

export default OrdinateOption;