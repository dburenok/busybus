import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CapacityRatings from './CapacityRating';

import {fetchBusCapacityAsync} from 'store/thunks';
import { useDispatch } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ fontSize: 16, m: 0, pl: 2, pt: 2, pb: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function CapacityDialog({ dialogOpen, dialogToggle, bus }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusCapacityAsync(bus['VehicleNo']));
  }, []);

  return (
    <div>
      <BootstrapDialog fullWidth
  maxWidth="xs" onClose={dialogToggle} aria-labelledby="customized-dialog-title" open={dialogOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={dialogToggle}>
          {bus['RouteNo'] + '    ' + bus['Direction']}
        </BootstrapDialogTitle>
        <Typography sx={{ m: 0, pl: 2 }}>{'Destination: ' + bus['Destination']}</Typography>
        <DialogContent dividers>
          <CapacityRatings busNo={bus['VehicleNo']}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
