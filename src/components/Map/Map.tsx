"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngTuple } from "leaflet";
import { useLocalStorage } from "@/templates/LocalStorageContext";
import { User } from "@/components/user/types";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

interface Marker {
  geocode: LatLngTuple;
  popUp: string;
  markerIcon: string;
}

const getMarkers = (users: User[]): Marker[] => {
  return users.map((user: User) => {
    const { latitude, longitude } = user.location.coordinates;

    return {
      markerIcon: `${user.picture.medium}`,
      geocode: [Number(latitude), Number(longitude)],
      popUp: `${user.name.first} ${user.name.last}`,
    };
  });
};

const customIcon = (icon: string) => {
  return new Icon({
    className: "round-marker-icon",
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function Map() {
  const { confirmedUsers } = useLocalStorage();

  return (
    <div className={styles.map}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        maxZoom={18}
        minZoom={2}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getMarkers(confirmedUsers).map((marker) => {
          return (
            <Marker
              key={marker.popUp}
              position={marker.geocode}
              icon={customIcon(marker.markerIcon)}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
