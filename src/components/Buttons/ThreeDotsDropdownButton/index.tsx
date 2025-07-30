import { DropdownButton, DropdownContainer, DropdownMenu } from "./styles";
import { BsThreeDots } from "react-icons/bs";

interface DropdownThreeDotsProps {
  options: { title: string; action: () => void; disabled?: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownThreeDots: React.FC<DropdownThreeDotsProps> = ({
  options,
  isOpen,
  onToggle,
}) => {
  return (
    <DropdownContainer>
      <DropdownButton onClick={onToggle}>
        <BsThreeDots />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                if (!option.disabled) {
                  option.action();
                  onToggle();
                }
              }}
              style={{
                cursor: option.disabled ? "not-allowed" : "pointer",
                opacity: option.disabled ? 0.5 : 1,
                pointerEvents: option.disabled ? "none" : "auto",
              }}

            >
              {option.title}
            </div>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropdownThreeDots;
