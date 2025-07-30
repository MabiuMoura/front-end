import React from "react";
import { Button } from "./styles";

interface ButtonOrdinateProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
}

const ButtonOrdinate = React.forwardRef<HTMLButtonElement, ButtonOrdinateProps>(
  ({ onClick, children, disabled, backgroundColor }, ref) => {
    return (
      <Button
        onClick={(e) => onClick(e)}
        disabled={disabled}
        ref={ref}
        backgroundColor={backgroundColor}
      >
        {children}
      </Button>
    );
  }
);

export default ButtonOrdinate;
