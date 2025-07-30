import { IconType } from "react-icons/lib";
import {
  Left,
  IconWrapper,
  TextWrapper,
  TitleRow,
  Title,
  Description,
  DownloadButton,
  Card,
  Label,
} from "./styles";
import { FiDownload, FiFileText } from "react-icons/fi";

export interface DocumentCardInteface {
  title: string;
  label?: string;
  description: string;
  onDownload?: () => void;
  icon?: IconType;
}

const DocumentCard: React.FC<DocumentCardInteface> = ({
  title,
  label,
  description,
  onDownload,
  icon: Icon = FiFileText,
}) => {
  return (
    <Card>
      <Left>
        <IconWrapper>
          <Icon size={17} />
        </IconWrapper>
        <TextWrapper>
          <TitleRow>
            <Title>{title}</Title>
            {label && <Label>{label}</Label>}
          </TitleRow>
          <Description>{description}</Description>
        </TextWrapper>
      </Left>
      <DownloadButton onClick={onDownload}>
        <FiDownload size={12} />
      </DownloadButton>
    </Card>
  );
};

export default DocumentCard;
