import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ title, items }) => {
  console.log({ title, items });
  const theme = useTheme();

  // menu list collapse & items
  const navItems = [];
  for (const bus in items) {
    navItems.push(<NavItem key={items[bus].id} item={items[bus]} />);
  }

  return (
    <>
      <List
        subheader={
          title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {title}
            </Typography>
          )
        }
      >
        {navItems}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default NavGroup;
