import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faBusAlt, faMapPin, faArrowLeft, faArrowRight, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map, { Marker, GeolocateControl } from 'react-map-gl';
import busyBusSlice from 'store/BusyBusReducer';
import { fetchBusesOnRouteAsync, fetchStopRouteEstimatesAsync, fetchBusCapacityAsync, fetchClosestBusStopAsync } from '../store/thunks';
import CapacityDialog from './CapacityDialog';

const MAP_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const busStopIcon = faMapPin;
const busIcon = faBusAlt;

export function BusMap() {
  const [viewport, setViewport] = useState({
    latitude: 49.2529325119575,
    longitude: -123.11687785517196,
    zoom: 11
  });

  const [userCoords, setUserCoords] = useState([]);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserCoords([pos.coords.latitude, pos.coords.longitude]);
      setViewport({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5
      });
    });
  }, []);

  const busStops = useSelector((state) => state.busyBus.commuter.busStopsSearchResult);
  const selectedRoute = useSelector((state) => state.busyBus.commuter.selectedRoute);
  const buses = useSelector((state) => state.busyBus.commuter.busesToShow);
  const selectedBusStop = useSelector((state) => state.busyBus.commuter.selectedBusStop);
  const dialogOpened = useSelector((state) => state.busyBus.busPopupOpened);
  const showBusStopOnly = useSelector((state) => state.busyBus.showBusStopOnly);
  const closestBusStop = useSelector((state) => state.busyBus.commuter.closestBusStop);
  const dispatch = useDispatch();
  const [selectedBus, setSelectedBus] = useState({});
  const handleBusCapacityDialogToggle = () => {
    dispatch(busyBusSlice.actions.setShowBusPopUp(!dialogOpened));
  };
  const [busesInterval, setBusesInterval] = useState(-1);
  const [estimatesInterval, setEstimatesInterval] = useState(-1);

  const handleBusStopClick = (busStop) => {
    clearInterval(busesInterval);
    clearInterval(estimatesInterval);

    dispatch(fetchBusesOnRouteAsync({ selectedRoute }));
    setBusesInterval(setInterval(() => dispatch(fetchBusesOnRouteAsync({ selectedRoute })), 30000));

    dispatch(fetchStopRouteEstimatesAsync({ busStop, selectedRoute }));
    setEstimatesInterval(setInterval(() => dispatch(fetchStopRouteEstimatesAsync({ busStop, selectedRoute })), 30000));

    dispatch(busyBusSlice.actions.setSelectedBusStop(busStop));
    dispatch(busyBusSlice.actions.setShowSidebar(true));
    dispatch(busyBusSlice.actions.setShowBusStopOnly(false));
  };

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    dispatch(busyBusSlice.actions.setShowBusPopUp(true));
    dispatch(fetchBusCapacityAsync({ busNo: bus['VehicleNo'] }));
  };

  const markers = renderMarkers({
    busStops,
    buses,
    closestBusStop,
    handleBusStopClick,
    handleBusClick,
    selectedBusStop,
    selectedBus,
    showBusStopOnly
  });

  return (
    <>
      <Map
        reuseMaps={true}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAP_TOKEN}
        attributionControl={false}
      >
        {markers}
        <GeolocateControl
          onGeolocate={(evt) => {
            let latitude = evt.coords.latitude;
            let longitude = evt.coords.longitude;
            setUserCoords([latitude, longitude]);
            setViewport({
              latitude: latitude,
              longitude: longitude,
              zoom: 3.5
            });
            dispatch(fetchClosestBusStopAsync({ latitude, longitude }));
            dispatch(busyBusSlice.actions.setShowBusStopOnly(true));
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </Map>

      {/* Render closest bus using regular geolocation API to make bus stop call and pull out sidebar */}
      <CapacityDialog dialogOpen={dialogOpened} dialogToggle={handleBusCapacityDialogToggle} bus={selectedBus} />
    </>
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

function renderClosestBusStopMarker({ closestBusStop, handleBusStopClick }) {
  const busStopColor = 'red';
  const busStopSize = '3x';
  return (
    <Marker
      key={closestBusStop['StopNo']}
      latitude={closestBusStop['Latitude']}
      longitude={closestBusStop['Longitude']}
      anchor="center"
      onClick={() => handleBusStopClick(closestBusStop)}
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

function renderBusMarker({ bus, handleBusClick, selectedBus }) {
  return (
    <Marker
      key={bus['VehicleNo']}
      latitude={bus['Latitude']}
      longitude={bus['Longitude']}
      anchor="center"
      onClick={() => handleBusClick(bus)}
    >
      {getBusWithArrow(bus, selectedBus)}
    </Marker>
  );
}

function renderMarkers({
  busStops,
  buses,
  closestBusStop,
  handleBusStopClick,
  handleBusClick,
  selectedBusStop,
  selectedBus,
  showBusStopOnly
}) {
  if (showBusStopOnly) {
    if (Object.keys(closestBusStop).length === 0)
      return [...busStops.map((busStop) => renderBusStopMarker({ busStop, handleBusStopClick, selectedBusStop }))];
    else return [renderClosestBusStopMarker({ closestBusStop, handleBusStopClick })];
  } else return [...buses.map((bus) => renderBusMarker({ bus, handleBusClick, selectedBus }))];
}

function getBusWithArrow(bus, selectedBus) {
  const direction = bus['Pattern'][0].toUpperCase();
  const arrowSize = '1x';
  const color = selectedBus['VehicleNo'] === bus['VehicleNo'] ? 'orange' : 'black';

  const busMarker = (
    <FontAwesomeIcon
      icon={busIcon}
      size="2x"
      style={{
        color,
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
            color,
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
            color,
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
            color,
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
          color,
          size: arrowSize
        }}
      />
      {busMarker}
    </>
  );
}
