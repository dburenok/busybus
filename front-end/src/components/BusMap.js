import { useDispatch, useSelector } from 'react-redux';
import { faBusAlt, faMapPin, faArrowLeft, faArrowRight, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map, { Marker } from 'react-map-gl';
import busyBusSlice from 'store/BusyBusReducer';
import { fetchBusesOnStopAsync, fetchStopRouteEstimatesAsync } from '../store/thunks';

const MAP_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const initialViewState = {
  latitude: 49.2529325119575,
  longitude: -123.11687785517196,
  zoom: 11
};
const busStopIcon = faMapPin;
const busIcon = faBusAlt;

export function BusMap() {
  const busStops = useSelector((state) => state.busyBus.commuter.busStopsSearchResult);
  const selectedRoute = useSelector((state) => state.busyBus.commuter.selectedRoute);
  const buses = useSelector((state) => state.busyBus.commuter.busesToShow);
  const selectedBusStop = useSelector((state) => state.busyBus.commuter.selectedBusStop);
  const dispatch = useDispatch();

  const handleBusStopClick = (busStop) => {
    dispatch(fetchBusesOnStopAsync({ busStop }));
    dispatch(fetchStopRouteEstimatesAsync({ busStop, selectedRoute }));
    dispatch(busyBusSlice.actions.setSelectedBusStop(busStop));
    dispatch(busyBusSlice.actions.setShowSidebar(true));
  };

  const handleBusClick = (bus) => {
    alert(`Clicked on bus ${bus['VehicleNo']} with pattern ${bus['Pattern']}`);
  };

  const markers = renderMarkers({
    busStops,
    buses,
    handleBusStopClick,
    handleBusClick,
    selectedBusStop
  });

  return (
    <Map
      reuseMaps={true}
      initialViewState={initialViewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAP_TOKEN}
      attributionControl={false}
    >
      {markers}
    </Map>
  );
}

function renderBusStopMarker({ busStop, handleBusStopClick, selectedBusStop }) {
  const busStopColor = selectedBusStop['StopNo'] === busStop['StopNo'] ? 'red' : 'green';
  const busStopSize = selectedBusStop['StopNo'] === busStop['StopNo'] ? '3x' : '2x';

  return (
    <Marker
      key={busStop['StopNo']}
      latitude={busStop['Latitude']}
      longitude={busStop['Longitude']}
      anchor="center"
      onClick={() => handleBusStopClick(busStop)}
    >
      <FontAwesomeIcon
        icon={busStopIcon}
        size={busStopSize}
        style={{
          color: busStopColor,
          cursor: 'pointer'
        }}
      />
    </Marker>
  );
}

function renderBusMarker({ bus, handleBusClick }) {
  return (
    <Marker
      key={bus['VehicleNo']}
      latitude={bus['Latitude']}
      longitude={bus['Longitude']}
      anchor="center"
      onClick={() => handleBusClick(bus)}
    >
      {getBusWithArrow(bus)}
    </Marker>
  );
}

function renderMarkers({ busStops, buses, handleBusStopClick, handleBusClick, selectedBusStop }) {
  return [
    ...busStops.map((busStop) => renderBusStopMarker({ busStop, handleBusStopClick, selectedBusStop })),
    ...buses.map((bus) => renderBusMarker({ bus, handleBusClick }))
  ];
}

function getBusWithArrow(bus) {
  const direction = bus['Pattern'][0].toUpperCase();
  const arrowColor = 'black';
  const arrowSize = '1x';

  const busMarker = (
    <FontAwesomeIcon
      icon={busIcon}
      size="2x"
      style={{
        color: 'black',
        cursor: 'pointer'
      }}
    />
  );

  if (direction === 'W') {
    return (
      <>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            color: arrowColor,
            size: arrowSize
          }}
        />
        {busMarker}
      </>
    );
  }

  if (direction === 'E') {
    return (
      <>
        {busMarker}
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{
            color: arrowColor,
            size: arrowSize
          }}
        />
      </>
    );
  }

  if (direction === 'N') {
    return (
      <>
        {busMarker}
        <FontAwesomeIcon
          icon={faArrowUp}
          style={{
            color: arrowColor,
            size: arrowSize
          }}
        />
      </>
    );
  }

  // S bus
  return (
    <>
      <FontAwesomeIcon
        icon={faArrowDown}
        style={{
          color: arrowColor,
          size: arrowSize
        }}
      />
      {busMarker}
    </>
  );
}
