import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

export const OrdinateContainer = styled.div`
    display:flex;
    align-items:center;
    gap:12px;
    width:100%;
    border-radius: 8px;
    padding:8px;
    font-weight:400;
    &:hover {
        background-color:#1E293B !important;
    }
    @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
        padding:6px;
        gap:10px;
    }

    @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
        padding:6px;
        gap:8px;
    }

    @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
        padding:5px;
        gap:7px;
    }

    @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
        padding:4px;
        gap:6px;
    }

    @media (max-width: ${device.mobileSmall}) {
        padding:4px;
        gap:6px;
    }
`
