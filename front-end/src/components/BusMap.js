import { useSelector, useDispatch } from 'react-redux';
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Map, { Marker } from "react-map-gl";
import busyBusSlice from 'store/BusyBusReducer';


export function BusMap() {
  const busStopIcon = faMapPin;
  const busStops = useSelector((state) => state.busyBus.commuter.busStopsSearchResult);
  const dispatch = useDispatch();

  return (
    <Map
      reuseMaps={true}
      initialViewState={{
        latitude: 49.2529325119575,
        longitude: -123.11687785517196,
        zoom: 11,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}
    >
      {busStops.map((busStop) => {
        return (
          <Marker
            key={busStop["StopNo"]}
            latitude={busStop["Latitude"]}
            longitude={busStop["Longitude"]}
            anchor="center"
            onClick={() => {
              dispatch(busyBusSlice.actions.getUpcomingBusesbyBusStop());
            }}
          >
            <FontAwesomeIcon
              icon={busStopIcon}
              size="2x"
              style={{
                color: "green",
                cursor: "pointer",
              }}
            />
          </Marker>
        );
      })}
    </Map>
  );
}
