import { useSelector } from 'react-redux';
import NavGroup from './NavGroup';
import Divider from '@mui/material/Divider';

const MenuList = () => {
  const selectedBusStop = useSelector((state) => state.busyBus.commuter.selectedBusStop);
  const stopNo = selectedBusStop['StopNo'];
  const stopName = selectedBusStop['Name'];
  const estimates = useSelector((state) => state.busyBus.commuter.estimates);
  const patterns = Object.keys(estimates);

  const estimateGroups = patterns.map((pattern) => <NavGroup key={pattern} schedules={estimates[pattern]} pattern={pattern} />);

  return (
    <>
      <h2>Stop #{stopNo}</h2>
      <h4>Name: {stopName}</h4>
      <Divider />
      {estimateGroups}
    </>
  );
};

export default MenuList;
