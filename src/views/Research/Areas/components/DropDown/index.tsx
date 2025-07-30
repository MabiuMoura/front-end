import React, { forwardRef } from 'react';
import { DropdownContainer, DropdownClick, DropdownMenu } from './styles';

interface DropdownProps {
  isOpen: boolean;
  handleDropdownClick: () => void;
  children: React.ReactNode; 
  bgColor?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, handleDropdownClick, children, bgColor }, ref) => {
    return (
      <DropdownContainer ref={ref}>
          <DropdownClick
            onClick={(e) => {
              e.stopPropagation(); 
              handleDropdownClick(); 
            }}>
            ⋮ </DropdownClick>
        <DropdownMenu isOpen={isOpen} bgColor={bgColor}>
          {children}
        </DropdownMenu>
      </DropdownContainer>
    );
  }
);

export default Dropdown;