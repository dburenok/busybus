import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import { drawerWidth } from '../../store/constants';
// import { SET_MENU } from '../../store/actionTypes';
import busyBusSlice from '../../store/BusyBusReducer';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginRight: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const drawerOpened = useSelector((state) => state.busyBus.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch(busyBusSlice.actions.setMenu(!drawerOpened));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: drawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}

      {/* main content */}
      <Main theme={theme} open={drawerOpened}>
        {/* breadcrumb */}
        {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
        <Outlet />
      </Main>
      <Sidebar drawerOpen={drawerOpened} drawerToggle={handleLeftDrawerToggle} />
    </Box>
  );
};

export default MainLayout;
