import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import busyBusSlice from 'store/BusyBusReducer';
import { fetchRoutesAsync, fetchStopsOnRouteAsync } from '../../../../store/thunks';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
const AutocompleteStyle = styled(Autocomplete, { shouldForwardProp })(({ theme }) => ({
  width: 400,
  [theme.breakpoints.down('sm')]: {
    width: 240
  }
}));

const SearchAutoComplete = () => {
  const [open, setOpen] = React.useState(false);
  const busRoutes = useSelector((state) => state.busyBus.commuter.availableRoutes);
  const loading = false;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoutesAsync());
  }, [dispatch]);

  return (
    <AutocompleteStyle
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.route === value.route}
      getOptionLabel={(option) => option.route}
      options={busRoutes}
      loading={loading}
      onChange={(event, v) => {
        if (v === null) {
          dispatch(busyBusSlice.actions.setShowSidebar(false));
          dispatch(busyBusSlice.actions.clearStopsAndBuses());
          return; // control was cleared
        }
        dispatch(busyBusSlice.actions.setShowBusStopOnly(true));
        dispatch(fetchStopsOnRouteAsync({ routeNo: v.route }));
        dispatch(busyBusSlice.actions.setSelectedRoute(v.route));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter bus route here... (ex. 49)"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

const SearchSection = () => {
  return (
    <Box>
      <SearchAutoComplete />
    </Box>
  );
};

export default SearchSection;
