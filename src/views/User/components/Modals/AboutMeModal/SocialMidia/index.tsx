import * as S from "./styles";

interface SocialMidiaProps {
  children: React.ReactNode;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMidia = ({ children, error, value, onChange }: SocialMidiaProps) => {
  return (
    <S.Container>
      <S.LinksContainer>
        <S.IconLink>{children}</S.IconLink>
        <S.InputLink
          placeholder="Insira a URL"
          value={value}
          onChange={onChange}
        />
      </S.LinksContainer>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
};

export default SocialMidia;
