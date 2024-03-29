import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import SearchSection from './SearchSection';
import { IconMenu2 } from '@tabler/icons';
import PropTypes from 'prop-types';
import MapMarkerSwitch from 'components/MapMarkerSwitch';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //
const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 55,
          display: 'flex'
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', padding: '8px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      <SearchSection />
      <MapMarkerSwitch />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
