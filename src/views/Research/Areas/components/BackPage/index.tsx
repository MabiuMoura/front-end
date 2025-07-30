import { useNavigate } from "react-router-dom";
import { Container, BackIcon, Name } from "./styles";

interface props {
    firstName: string;
    secondName?: string;
}

const BackPage: React.FC<props> = ({ firstName, secondName }) => {
    const navigate = useNavigate();
    
    const ReturnPage = () => {
        navigate(-1);
      };
    return(
        <Container > 
                <BackIcon onClick={ReturnPage} />
                <Name strong >{firstName}</Name>
                <Name>{secondName}</Name>
        </Container>
    )
}

export default BackPage

