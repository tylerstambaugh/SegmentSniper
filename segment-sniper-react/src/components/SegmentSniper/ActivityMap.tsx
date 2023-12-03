import React, { useEffect, useState } from "react";
import { StravaMap } from "../../models/Activity/ActivityListItem";
import useAppConfigStore from "../../stores/useAppConfigStore";
import GoogleMapReact from "google-map-react";
import { decode } from "@mapbox/polyline";
import Polyline from "./Polyline";

type ActivityMapProps = {
  stravaMap: StravaMap;
  startLatlng?: number[];
  endLatlng?: number[];
};

const ActivityMap: React.FC<ActivityMapProps> = (props) => {
  const googleMapsApiKey = useAppConfigStore(
    (state) => state.appConfig?.googleMapsApiKey
  );

  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  const [center, setCenter] = useState({
    lat: 39.791,
    lng: -86.148003,
  });

  async function configureMap() {
    if (!!props.startLatlng) {
      setCenter({ lat: props.startLatlng[0], lng: props.startLatlng[1] });

      if (props.stravaMap.polyLine) {
        const decodedPath = decode(props.stravaMap.polyLine).map((point) => ({
          lat: point[0],
          lng: point[1],
        }));
        setPolylinePath(decodedPath);
        await defineBounds();
      }
    }
  }

  // useEffect(() => {
  //   if (!!props.startLatlng) {
  //     setCenter({ lat: props.startLatlng[0], lng: props.startLatlng[1] });

  //     if (props.stravaMap.polyLine) {
  //       const decodedPath = decode(props.stravaMap.polyLine).map((point) => ({
  //         lat: point[0],
  //         lng: point[1],
  //       }));
  //       setPolylinePath(decodedPath);
  //       defineBounds();
  //     }
  //   }
  // }, [props]);

  async function defineBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < polylinePath.length; i++) {
      bounds.extend(
        new google.maps.LatLng(polylinePath[i].lat, polylinePath[i].lng)
      );
    }
    googleMap?.fitBounds(bounds);
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
        center={center}
        defaultZoom={11}
        onGoogleApiLoaded={({ map }) => {
          setGoogleMap(map), configureMap();
        }}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {polylinePath.length > 0 && (
          <Polyline
            map={googleMap}
            path={polylinePath}
            options={{ strokeColor: "#FF0000" }}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default ActivityMap;
