import { cloneElement, ReactElement, ReactNode } from "react";

interface Props {
  contextProviders: ReactElement[];
  children: ReactNode;
}

const ContextProviderComposer: React.FC<Props> = ({
  contextProviders,
  children,
}: Props) => {
  return contextProviders.reduceRight(
    (children, parent) => cloneElement(parent, { children }),
    children
  );
};

export default ContextProviderComposer;