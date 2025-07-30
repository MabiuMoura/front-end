import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface ErrorMessageProps {
  field: string;
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, field);

  if (!fieldError) {
    return null;
  }

  return <SSpan>{fieldError.message?.toString()}</SSpan>;
}

const SSpan = styled.label`
  font-style: normal;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.alert_colors.errorModal};
`;