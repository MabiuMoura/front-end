import {
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import ReactDOM from "react-dom";
import { GoQuestion } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { DefaultTheme, ThemeContext } from "styled-components";
import * as S from "./styles";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  explanation?: boolean;
  width?: string;
  closeOnOutsideClick?: boolean;
  modalId?: string;
  zIndex?: number;
}

export function ModalGeneral({ show, onClose, children, title, explanation, width, closeOnOutsideClick = true,
  modalId = "default-modal", zIndex }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const { colors } = useContext(ThemeContext) as DefaultTheme;
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsBrowser(true);

    const handleClickOutside = (e: Event) => {
      const isClickInsideAnyModal = document.querySelectorAll('.modal-content')
          .forEach(modal => {
            if (modal.contains(e.target as Node)) {
              return;
            }
          });

        if (
          modalWrapperRef.current &&
          !modalWrapperRef.current.contains(e.target as Node)
        ) {
          const clickedElement = e.target as HTMLElement;
          const isClickInsideOtherModal = !!clickedElement.closest('.modal-content');
          
          if (!isClickInsideOtherModal) {
            onClose();
          }
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, closeOnOutsideClick]);

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  const handleContentMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const modalContent = show ? (
    <S.StyledModalOverlay zIndex={zIndex}>
      <S.StyledModalWrapper 
      ref={modalWrapperRef} 
        className="modal-content"
        data-modal-id={modalId}
        onMouseDown={handleContentMouseDown}>
        <S.StyledModal width={width} title={title}>
          {title ? (
            <S.StyledModalHeaderWithTitle>
              {title}
              {explanation ? <GoQuestion size={20} /> : null}
            </S.StyledModalHeaderWithTitle>
          ) : (
            <S.StyledModalHeader />
          )}
          <S.StyledButtonClose onClick={handleCloseClick}>
            <IoMdClose color={colors.neutral_colors.white} size={20} />
          </S.StyledButtonClose>
          <S.StyledModalBody>{children}</S.StyledModalBody>
        </S.StyledModal>
      </S.StyledModalWrapper>
    </S.StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as Element
    );
  } else {
    return null;
  }
}
