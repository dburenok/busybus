// project imports
import { useSelector } from 'react-redux';
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const busGroups = useSelector((state) => state.busyBus.commuter.upComingBuses);
  
  const navGroups = [];
  for (const busGroup in busGroups) {
    navGroups.push(<NavGroup key={busGroup} title={busGroup} items={busGroups[busGroup]}/>);
  }
  return (
    <>
    {navGroups}
    </>
  );
};

export default MenuList;
