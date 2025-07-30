import styled from "styled-components";

export const Card = styled.div`
  background-color: #1f2937;
  height: 20%;
  width: 100%;
  color: white;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 40px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  border-radius: 5px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const Label = styled.span`
  font-size: 12px;
  color: #9ca3af;
  margin-left: 8px;
`;

export const Description = styled.span`
  font-size: 10px;
  color: #9ca3af;
`;

export const DownloadButton = styled.button`
  background-color: #475569;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #374151;
  }
`;
