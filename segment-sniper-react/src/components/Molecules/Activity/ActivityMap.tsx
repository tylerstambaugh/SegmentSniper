import React, { useEffect, useMemo, useState } from "react";
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

const ActivityMap: React.FC<ActivityMapProps> = React.memo((props) => {
  const googleMapsApiKey = useAppConfigStore(
    (state) => state.appConfig?.googleMapsApiKey
  );

  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  const memoizedPolylinePath = useMemo(() => {
    if (props.stravaMap.polyLine) {
      return decode(props.stravaMap.polyLine).map((point) => ({
        lat: point[0],
        lng: point[1],
      }));
    }
    return [];
  }, [props.stravaMap.polyLine]);

  const center = useMemo(() => {
    return { lat: props.startLatlng![0], lng: props.startLatlng![1] };
  }, [props.startLatlng]);

  async function configureMap(map: google.maps.Map) {
    setGoogleMap(map);
    if (!!props.startLatlng) {
      setPolylinePath(memoizedPolylinePath);
      setMapInitialized(true);
    }
  }

  async function defineBounds() {
    if (googleMap && polylinePath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      for (let i = 0; i < polylinePath.length; i++) {
        bounds.extend(
          new google.maps.LatLng(polylinePath[i].lat, polylinePath[i].lng)
        );
      }
      googleMap?.fitBounds(bounds);
    }
  }

  useEffect(() => {
    if (mapInitialized) {
      defineBounds();
    }
  }, [mapInitialized]);

  return (
    <div style={{ minHeight: "250px", height: "100%", width: "100%" }}>
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
});

export default ActivityMap;
