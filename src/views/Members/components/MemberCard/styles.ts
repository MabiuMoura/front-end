import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi";
import { device } from "../../../../shared/configs/device.config";

export const MemberCardContainer = styled.div`
    user-select: none;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 230px;
    height: 330px;
    margin-top:10px;
    
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        width:210px;
        height:290px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        width:170px;
        height:250px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        width:150px;
        height:240px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        width:130px;
        height:200px;
    }

    @media (max-width: ${device.mobileSmall}) {
        width:130px;
        height:200px;
    }
`

export const MemberPhotoContainer = styled.div`
    position: absolute;
    top: -25%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    color: ${({theme}) => theme.colors.primary_colors.gray50};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 45px;
    width: 170px;
    height: 170px;
    background-color: #1e293b;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }

    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        width: 145px;
        height: 145px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        width: 120px;
        height: 120px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        width: 100px;
        height: 100px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        width: 90px;
        height: 90px;
    }

    @media (max-width: ${device.mobileSmall}) {
        width: 80px;
        height: 80px;
    }
`;

export const MemberCardBody = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:15px;
    height:90%;
    width:100%;
    padding:40% 15px 15px 15px;
    text-align:center;
    border: 1px solid #475569;
    background-color:#0F172A;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        padding:40% 10px 10px 10px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        padding:35% 10px 10px 10px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        padding:32% 10px 10px 10px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        padding:30% 10px 10px 10px;
    }

    @media (max-width: ${device.mobileSmall}) {
        padding:30% 10px 10px 10px;
    }
`

export const Title = styled.h2`
    font-size:19px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:17px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:16px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:14px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:12px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:11px;
    }
`

export const DescriptionMemberContainer = styled.div`
    display:flex;
    height:100%;
    width:100%;
    flex-direction:column;
    justify-content:space-between;
    padding-top:5px;
    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        padding-top:0px;
    }
    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        padding-top:0px;
    }

    @media (max-width: ${device.mobileSmall}) {
        padding-top:0px;
    }
`

export const DescriptionHeader = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:50%;
    text-align:start;
`

export const TextName = styled.p`
    color: #8D8D8D;
    font-size:17px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:16px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:13px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:14px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:10px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:10px;
    }
`

export const TextStack = styled.p`
    color: #8D8D8D;
    font-weight:300;
    font-size:13px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:13px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:11px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:11px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:9.5px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:9px;
    }
`

export const MemberSince = styled.p`
    color: #FFFFFF;
    font-weight:300;
    font-size:11px;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:11px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:9.5px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:9px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:8px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:7.5px;
    }
`
export const DescriptionFooter = styled.div`
    display:flex;
    gap:5px;
    justify-content:center;
    position: relative;
    align-items:center;
    margin-top:auto;
    width:100%;
`
export const SeeMoreContent = styled.div`
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:15px;
    border-radius: 10px;
    width:100%;
    color:#94A3B8;
    text-decoration: underline;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:12px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:12.5px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:12px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:11px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:11px;
    }
`

export const DeleteIcon = styled(HiOutlineTrash)`
    position: absolute;
    right: 0;
    cursor: pointer;
    font-size:23px;
    color:#94A3B8;
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        font-size:20px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        font-size:19px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        font-size:18px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        font-size:17px;
    }

    @media (max-width: ${device.mobileSmall}) {
        font-size:17px;
    }
`
