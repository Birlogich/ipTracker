import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import styles from "../../../styles/map.module.scss";

export const Map = ({ coords }) => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        if (coords.lat) {
          map.locate();
        }
      },
      locationfound() {
        if (coords.lat) {
          setPosition(coords);
          map.flyTo(coords, map.getZoom());
        }
      },
    });

    if (coords.lat) {
      map.locate();
    }

    return position === null ? null : (
      <Marker
        position={position}
        eventHandlers={{
          click: () => {
            console.log("marker clicked");
          },
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={true}
      className={styles.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};
