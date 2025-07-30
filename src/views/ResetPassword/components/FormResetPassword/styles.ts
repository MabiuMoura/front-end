import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const ForgotPassword = styled.div`
    text-align: right;
    span {
        color: ${({theme}) => theme.colors.primary_colors.gray50};
        font-size: 13px;

        &:hover {
            cursor: pointer;
        }

        @media (max-width: 543px) {
          font-size: 9px;
          text-align: right;
        }
    }
`;

export const FormStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary_colors.green};
  font-family: ${(props) => props.theme.fonts.poppins};
  letter-spacing: 2px;
  font-size: 70px;
  font-weight: 500;
  padding-bottom: 50px;
`;

export const SmallerGapContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

export const DivCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  margin-top: 43px;

  @media (max-width: 543px) {
    margin-top: 30px;
  }
`;

export const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({theme}) => theme.colors.primary_colors.gray100};
  margin: 0 5px;

  @media (max-width: 543px) {
    margin: 0 2px;
  }
`;

export const Message = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({theme}) => theme.colors.primary_colors.gray50};
  @media (max-width: 543px) {
          font-size: 8px;
  }
`;

