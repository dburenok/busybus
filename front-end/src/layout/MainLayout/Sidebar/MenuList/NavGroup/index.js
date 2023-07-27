import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';
import NavItem from '../NavItem';
import PropTypes from 'prop-types';

const NavGroup = ({ schedules, pattern }) => {
  const theme = useTheme();
  const navItems = schedules.map((schedule, index) => <NavItem key={index} item={schedule} />);

  return (
    <>
      <List
        subheader={
          <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
            {pattern}
          </Typography>
        }
      >
        {navItems}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  schedules: PropTypes.array,
  pattern: PropTypes.string
};

export default NavGroup;
