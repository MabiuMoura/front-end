import styled from "styled-components";

export const ContainerViewMore = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  user-select: none;
  padding: 0px 45px;
  margin-top: 45px;
  gap: 3%;
`;

export const ContainerBody = styled.div`
  margin-left: 35px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const DescriptionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GroupsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Titles = styled.p`
  color: ${({ theme }) => theme.colors.primary_colors.blueGray};
  font-size: 16px;
  font-weight: 600;
`;

export const GroupsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #0f172a;
  border-radius: 8px;
  overflow-x: auto;
  width: 100%;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.primary_colors.gray200};
`;

export const GroupItem = styled.div<{ isActive: boolean; width: string }>`
  color: ${({ isActive }) => (isActive ? "#FFFFFF" : "#A0A0A0")};
  font-size: 14px;
  cursor: pointer;
  padding: 10px 0;
  width: ${(props) => props.width};
  text-align: center;
  transition: color 0.3s ease, background-color 0.3s ease;
  position: relative;
  /* z-index: 2; */

  &:hover {
    color: ${({ isActive }) => (isActive ? "#FFFFFF" : "#CCCCCC")};
  }

  &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    height: calc(100% - 8px);
    width: calc(100% - 8px);
    background-color: ${({ isActive }) =>
      isActive ? "#334155" : "transparent"};
    z-index: -1;
    transition: background-color 0.3s ease;
    border-radius: 4px;
  }

  &:hover::after {
    background-color: ${({ isActive }) => (isActive ? "#334155" : "#1E293B")};
  }
`;

export const Separator = styled.div`
  position: absolute;
  right: 0;
  top: 30%;
  height: 40%;
  width: 1px;
  background-color: #a0a0a0;
`;

export const MembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  justify-content: flex-start;
`;

export const MemberItem = styled.li`
  color: #ffffff;
  font-size: 14px;
  padding: 5px 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`;
