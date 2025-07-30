import { FC } from "react";
import * as S from "./styles"

export const Loader: FC = () => (
  <S.LoaderWrapper>
    <S.LoaderDot />
    <S.LoaderDot />
    <S.LoaderDot />
    <S.LoaderDot />
  </S.LoaderWrapper>
);
