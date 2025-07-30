import { HTMLAttributes } from "react";
import styled from "styled-components";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field(props: FieldProps) {
  return <SField {...props} />;
}

const SField = styled.div`
  text-align: left;
  margin-bottom: 2rem;
`;
