import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import LogoRH from "../../../assets/logoWithoutWord.svg";
import { ProfilePicture } from "../../../components/ProfilePictureUserId";
import IconMenu from "./components/UserMenu";
import * as S from "./styles";

interface NavbarProps {
  currentRoute: string;
  toggleSidebar: () => void;
  userID?: string;
  name?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, toggleSidebar, userID, name="User" }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.HeaderStyled>
      <S.Container>
        <S.SmallContainer>
          <S.MenuIcon onClick={toggleSidebar}/>
          <S.Logo src={LogoRH} />
          <S.TextRoute>{currentRoute}</S.TextRoute>
        </S.SmallContainer>
        <S.LogoCenter src={LogoRH} />
        <S.SmallTwoContainer>
          <S.IconBell />
          <S.UserImage onClick={handleClick}>
            <ProfilePicture userId={userID} name={name}/>
          </S.UserImage>
        </S.SmallTwoContainer>
      </S.Container>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={
          { mt: "1px", "& .MuiMenu-paper": 
            { backgroundColor: "transparent", }, 
          }}
      >
        <IconMenu />
      </Menu>
    </S.HeaderStyled>
  );
};

export default Navbar;
