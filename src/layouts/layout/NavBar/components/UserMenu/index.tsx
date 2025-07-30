import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { LuUser } from 'react-icons/lu';
import { TbLogout } from 'react-icons/tb';
import { Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../../shared/constants/enums';
import { useEffect, useState } from 'react';
import { useAuthUser } from '../../../../../context/authContext';

const IconMenu = () => {

const [isScreenSmallMobile, setIsScreenSmallMobile] = useState(window.innerWidth <= 600);
const { logout } = useAuthUser();

const handleResize = () => {
  setIsScreenSmallMobile(window.innerWidth <= 600);
};

useEffect(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
  
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

const theme = useTheme();
const navigate = useNavigate();

const handleLogout = () => {
  try {
    logout();
    navigate(RoutePath.LOGIN);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

  return (
    <Paper sx={{ width: isScreenSmallMobile ? 150 : 170, maxHeight:'100%', height: isScreenSmallMobile ? 120 : 100, backgroundColor: theme.colors.primary_colors.blue100, overflow: 'hidden'}} >
      <MenuList>
        <MenuItem onClick={() => navigate(RoutePath.USER)}>
          <ListItemIcon>
          <LuUser fontSize={isScreenSmallMobile ? "small" : "medium"} color={theme.colors.neutral_colors.white}/>
          </ListItemIcon>
          <ListItemText disableTypography
          primary={<Typography variant="body2" style={{ color: theme.colors.neutral_colors.white, fontSize: isScreenSmallMobile ? 9 : 15 }}>Meu Perfil</Typography>}/>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <TbLogout fontSize={isScreenSmallMobile ? "small" : "medium"} color={theme.colors.neutral_colors.white}/>
          </ListItemIcon>
          <ListItemText 
          disableTypography
          primary={<Typography variant="body2" style={{ color: theme.colors.neutral_colors.white, fontSize: isScreenSmallMobile ? 9 : 15 }}>Sair</Typography>}/>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default IconMenu