import styled from "styled-components";
import { TbArticle } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";
import { device } from "../../../../../shared/configs/device.config";

interface IconContainerProps {
    isLink: boolean;
  }

export const CardContainer = styled.div `
    display:flex;
    flex-direction:column;
    gap:25px;
    width:100%;
    height:270px;
    overflow-y:auto;
    padding-right:20px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    text-align: justify;
    color: ${({ theme }) => theme.colors.primary_colors.lilac};
`

export const CardItem = styled.div`
    display: flex;
    background-color: #1E293B;
    width: 100%;
    height: 65px;
    border-radius:10px;
    padding:10px 5px;
    align-items:center;
    justify-content:space-between;
`

export const ArticleIcon = styled(TbArticle)`
    font-size:33px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:30px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:29px;
    }

    @media  (max-width: ${device.tablet}) {
        font-size:29px;
    }
`

export const LinkIcon = styled(AiOutlineLink)`
    font-size:31px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:28px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:27px;
    }

    @media (max-width: ${device.tablet}) {
        font-size:27px;
    }

`

export const IconContainer = styled.div<IconContainerProps>`
    display:flex;
    gap:5px;
    align-items:center;
    margin-right:15px;
    margin-left:15px;
    user-select:none;
    font-size:12px;
    font-weight:300;
    cursor: ${(props) => (props.isLink ? 'pointer' : 'default')};
    @media (max-width: ${device.desktop_hd}) {
        font-size:9px;
    }

`

export const TitleContainer = styled.div`
    width:90%;
    font-size:15px;
    font-weight:600;
    padding-right:10px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:11px;
        padding-right:7px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:9px;
        padding-right:7px;
    }

    @media (max-width: ${device.tablet}) {
        font-size:10px;
        padding-right:7px;
    }

`