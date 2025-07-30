import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const StepsWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  padding-bottom: 50px;
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Step = styled.div<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? props.theme.colors.secondary_colors.grayDark : props.theme.colors.secondary_colors.grayLight };
  color: white;
  font-weight: bold;
  margin-bottom: 5%;
`;

export const StepLine = styled.div<{ active?: boolean }>`
  width: 50px;
  height: 2px;
  background-color: ${props => props.active ? props.theme.colors.secondary_colors.grayDark : props.theme.colors.secondary_colors.grayLight };
  margin: 0 10px;
  margin-bottom: 5%;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
