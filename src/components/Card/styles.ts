
import { GoQuestion } from "react-icons/go";
import { HiPencil } from "react-icons/hi";
import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

interface ContainerProps {
  alignment?: string;
}


export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignment }) => alignment || "center"};
  gap: 30px;
  width: 100%;
  height: fit-content;
  background-color: #0f172a;
  border-radius: 7px;
  box-sizing: border-box;
  border: 0.7px solid #475569;
  padding: 25px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  text-align: justify;
  color: ${({ theme }) => theme.colors.primary_colors.lilac};

`;

export const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  align-items: center;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

export const IconEdit = styled(HiPencil)`
  cursor: pointer;
`;

export const IconQuestion = styled(GoQuestion)`
  cursor: pointer;
`;
