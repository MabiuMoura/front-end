import * as S from "./styles";

interface ButtonProps {
  onClick?: () => void;
  title: string;
  bgColor?: string;
  fontColor?: string;
}

const ButtonModalTable: React.FC<ButtonProps> = ({ onClick, title, bgColor, fontColor }) => {
  return (
    <S.Button $bgColor={bgColor} $fontColor={fontColor} onClick={onClick}>
      {title}
    </S.Button>
  );
};

export default ButtonModalTable;
