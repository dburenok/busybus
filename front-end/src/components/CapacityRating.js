import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as constants from '../store/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { reportBusCapacityAysnc } from '../store/thunks';

const labels = {
  0.5: constants.BUS_CAPACITY_LEVEL.EMPTY,
  3: constants.BUS_CAPACITY_LEVEL.BUSY,
  5: constants.BUS_CAPACITY_LEVEL.FULL
};



function getHoverLabelText(value) {
  return `${labels[value]}`;
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1565C0'
  },
  '& .MuiRating-iconHover': {
    color: '#1565C0'
  }
});

export default function CapacityRatings({busNo}) {
  const [value, setValue] = React.useState(-1);
  const [hover, setHover] = React.useState(-1);
  const dispatch = useDispatch();
  let selectedBusCapacity = useSelector((state) => state.busyBus.commuter.selectedBusCapacity).roundedAvgCapacity;
  const usefulReportCount =  useSelector((state) => state.busyBus.commuter.selectedBusCapacity).countUsefulReport;
  const handleBusCapacityReport = () => {
    dispatch(reportBusCapacityAysnc({busNo, capacityLevel:value}));
  };
  
  function getReadOnlyLabelText(value) {
    if (value === -1 || value === undefined) return "no report";
    return `Out of ${usefulReportCount} report`;
  }

  if (selectedBusCapacity === undefined) {
    selectedBusCapacity = 0;
  }

  return (
    <Stack
    spacing={1}
    >
      <Typography gutterBottom>Current Capacity:</Typography>
      <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledRating
        value={selectedBusCapacity < 0? 0 : selectedBusCapacity}
        precision={0.5}
        readOnly
        icon={<FontAwesomeIcon icon={faPerson} />}
        emptyIcon={<FontAwesomeIcon icon={faPerson} />}
      />
      <Box sx={{ ml: 2 }}>{getReadOnlyLabelText(selectedBusCapacity)}</Box>
    </Box>
      
      <Typography gutterBottom>Report Capacity:</Typography>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getHoverLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<FontAwesomeIcon icon={faPerson} />}
          emptyIcon={<FontAwesomeIcon icon={faPerson} />}
        />
        {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
      </Box>
      <Button autoFocus onClick={handleBusCapacityReport}>
          Save changes
      </Button>
    </Stack>
  );
}
