import { useDispatch, useSelector } from 'react-redux';
import { faBusSimple, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map, { Marker } from 'react-map-gl';
import busyBusSlice from 'store/BusyBusReducer';
import { fetchBusesOnStopAsync } from '../store/thunks';

const MAP_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const initialViewState = {
  latitude: 49.2529325119575,
  longitude: -123.11687785517196,
  zoom: 11
};
const busStopIcon = faMapPin;
const busIcon = faBusSimple;

export function BusMap() {
  const busStops = useSelector((state) => state.busyBus.commuter.busStopsSearchResult);
  const buses = useSelector((state) => state.busyBus.commuter.busesToShow);
  const dispatch = useDispatch();

  const handleBusStopClick = (busStop) => {
    dispatch(fetchBusesOnStopAsync({ busStop }));
    dispatch(busyBusSlice.actions.setShowSidebar(true));
  };

  const handleBusClick = (bus) => {
    alert(`Clicked on bus ${bus['VehicleNo']}`);
  };

  return (
    <Map
      reuseMaps={true}
      initialViewState={initialViewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAP_TOKEN}
      attributionControl={false}
    >
      {renderMarkers({
        busStops,
        buses,
        handleBusStopClick,
        handleBusClick
      })}
    </Map>
  );
}

function renderBusStopMarker(busStop, handleClick) {
  return (
    <Marker
      key={busStop['StopNo']}
      latitude={busStop['Latitude']}
      longitude={busStop['Longitude']}
      anchor="center"
      onClick={() => handleClick(busStop)}
    >
      <FontAwesomeIcon
        icon={busStopIcon}
        size="2x"
        style={{
          color: 'green',
          cursor: 'pointer'
        }}
      />
    </Marker>
  );
}

function renderBusMarker(bus, handleBusClick) {
  return (
    <Marker
      key={bus['VehicleNo']}
      latitude={bus['Latitude']}
      longitude={bus['Longitude']}
      anchor="center"
      onClick={() => handleBusClick(bus)}
    >
      <FontAwesomeIcon
        icon={busIcon}
        size="2x"
        style={{
          color: 'orange',
          cursor: 'pointer'
        }}
      />
    </Marker>
  );
}

function renderMarkers({ busStops, buses, handleBusStopClick, handleBusClick }) {
  return [
    ...busStops.map((busStop) => renderBusStopMarker(busStop, handleBusStopClick)),
    ...buses.map((bus) => renderBusMarker(bus, handleBusClick))
  ];
}
