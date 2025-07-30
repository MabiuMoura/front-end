import {
    ReactNode,
    useEffect,
    useRef,
    useState
  } from "react";
  import ReactDOM from "react-dom";
  import * as S from "./styles";
  import { GoQuestion } from "react-icons/go";
  
  interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: ReactNode;
    explanation?: boolean;
    width?: string;
  }
  
  export function ModalTable({ show, onClose, children, title, explanation, width }: ModalProps) {
    const [isBrowser, setIsBrowser] = useState(false);
    const modalWrapperRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      setIsBrowser(true);
  
      const handleClickOutside = (e: Event) => {
        if (
          modalWrapperRef.current &&
          !modalWrapperRef.current.contains(e.target as Node)
        ) {
          onClose();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
  
    const modalContent = show ? (
      <S.StyledModalOverlay>
        <S.StyledModalWrapper ref={modalWrapperRef}>
          <S.StyledModal width={width}>
            {title ? (
              <S.StyledModalHeaderWithTitle>
                {title}
                {explanation ? <GoQuestion size={20}/>: null}
              </S.StyledModalHeaderWithTitle>
            ) : (
              <S.StyledModalHeader/>
            )}
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
  