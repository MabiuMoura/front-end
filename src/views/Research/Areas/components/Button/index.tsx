import { StyledButton } from "./styles"

export interface ButtonProps {
    width: string[];
    height: string[];
    onClick: () => void;
    children: React.ReactNode;
    fontsize?: string[] ;
    fontweight?: string[] ;
  }

  const Button: React.FC<ButtonProps> = ({ width, height, onClick, children, fontsize, fontweight }) => {
    return (
        <StyledButton
            width={width}
            height={height}
            onClick={onClick}
            fontSize={fontsize}
            fontweight={fontweight}
        >
            {children}
        </StyledButton>
    );
};

  
  export default Button;