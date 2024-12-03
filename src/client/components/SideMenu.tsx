import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

interface ListItemLinkProps {
  icon?: React.ReactElement<any>;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <ListItemButton component={RouterLink} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const SideMenu: React.FC = () => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemLink to='/' primary='Home' icon={<HomeIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemLink to='/day1' primary='Day 1' icon={<CalculateIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemLink to='/day2' primary='Day 2' icon={<CalculateIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemLink to='/day3' primary='Day 3' icon={<CalculateIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemLink to='/day4' primary='Day 4' icon={<CalculateIcon />} />
        </ListItem>
      </List>
    </Drawer>
  );
};
