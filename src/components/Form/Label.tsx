import { LabelHTMLAttributes } from "react";
import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <SLabel {...props} />;
}

const SLabel = styled.label`
  font-family: ${(props) => props.theme.fonts.poppins};
  color: ${(props) => props.theme.colors.primary_colors.gray50};
  margin: 10px;
  font-weight: 550;
  font-size: 14px;
  letter-spacing: 1px;

  @media (max-width: ${device.tablet}) {
    font-size: 12px;
  }

  @media (max-width: 543px) {
    font-size: 10px;
  }
`;