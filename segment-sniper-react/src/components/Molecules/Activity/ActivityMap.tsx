import React, { useEffect, useState } from "react";
import useAppConfigStore from "../../../stores/useAppConfigStore";
import GoogleMapReact from "google-map-react";
import { decode } from "@mapbox/polyline";
import Polyline from "../../Atoms/Polyline";
import { StravaMap } from "../../../models/StravaMap";
import MapMarker from "../../Atoms/MapMarker";

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
    lat: props.startLatlng![0],
    lng: props.startLatlng![1],
  });

  async function configureMap(map: google.maps.Map) {
    setGoogleMap(map);
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

  async function defineBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < polylinePath.length; i++) {
      bounds.extend(
        new google.maps.LatLng(polylinePath[i].lat, polylinePath[i].lng)
      );
    }
    googleMap?.fitBounds(bounds);
  }

  useEffect(() => {
    if (polylinePath.length > 0) {
      defineBounds();
    }
  }, [polylinePath]);

  return (
    <div style={{ minHeight: "300px", height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
        center={center}
        defaultZoom={11}
        onGoogleApiLoaded={async ({ map }) => {
          await configureMap(map);
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
        <MapMarker
          lat={props.startLatlng![0]}
          lng={props.startLatlng![1]}
          text="Start"
          isStart={true}
        />
        <MapMarker
          lat={props.endLatlng![0]}
          lng={props.endLatlng![1]}
          text="End"
          isStart={false}
        />
      </GoogleMapReact>
    </div>
  );
};

export default ActivityMap;
