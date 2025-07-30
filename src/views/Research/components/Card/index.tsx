import { useNavigate  } from 'react-router-dom';
import { FrontCardDiv, BackCardDiv, CardContainer, Title, Text, Span } from './styles'

interface CardProps{
    title:string;
    description: string;
    onClickTo: string;
}

const CardSearch: React.FC<CardProps> = ({ title, description,onClickTo }) => {
    const navigate = useNavigate();

     function navigateTo(e: React.MouseEvent<HTMLDivElement>){
        e.preventDefault();
        

        const route = "/research" + onClickTo
        console.log(route)
        navigate(route)
    }

    return(
        <CardContainer >
            <FrontCardDiv onClick={navigateTo}>
                <Title>{title}</Title>
                <Text>{description}</Text>
                <Span >EXPLORAR &gt;</Span>
            </FrontCardDiv>
            <BackCardDiv></BackCardDiv>
        </CardContainer>
    )
}

export default CardSearch