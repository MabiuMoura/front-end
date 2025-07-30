import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #a0a0a0;
  font-size: 26px;
  outline: none;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const DropdownMenu = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: -12px;
  background-color: #1e293b;
  border: 1px solid #475569;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: 5px;
  z-index: 200;
  width: fit-content;
  padding: 10px 5px;
  white-space: nowrap;

  &::before {
    content: "";
    z-index: 205;
    position: absolute;
    top: -8px;
    right: 15px;
    border-width: 0 10px 8px 10px;
    border-style: solid;
    border-color: transparent transparent #1e293b transparent;
  }

  &::after {
    content: "";
    z-index: 201;
    position: absolute;
    top: -10px;
    right: 13px;
    border-width: 0 12px 10px 12px;
    border-style: solid;
    border-color: transparent transparent #475569 transparent;
  }

  & > div {
    padding: 10px;
    cursor: pointer;
    border-radius: 12px;
    background-color: #334155;
    color: #94a3b8;
    white-space: nowrap;

    &:hover {
      background-color: #1e3a8a;
    }
  }
`;
