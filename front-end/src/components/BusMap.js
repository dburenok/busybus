import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Map, { Marker } from "react-map-gl";

export function BusMap() {
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
      <Marker
        latitude={49.26349162711313}
        longitude={-123.18588908494505}
        anchor="center"
      >
        <FontAwesomeIcon icon={faBus} color="green" size="2x" />;
      </Marker>
    </Map>
  );
}
