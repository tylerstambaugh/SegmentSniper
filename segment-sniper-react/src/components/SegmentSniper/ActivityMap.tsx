import React, { useEffect, useState } from "react";
import {
  ActivityListItem,
  StravaMap,
} from "../../models/Activity/ActivityListItem";
import useAppConfigStore from "../../stores/useAppConfigStore";
import GoogleMapReact from "google-map-react";
import { decode } from "@mapbox/polyline";
import useActivityListStore from "../../stores/useActivityListStore";
import Polyline from "./Polyline";

type ActivityMapProps = {
  stravaMap: StravaMap;
  activityId: string;
};

const ActivityMap: React.FC<ActivityMapProps> = (props) => {
  const googleMapsApiKey = useAppConfigStore(
    (state) => state.appConfig?.googleMapsApiKey
  );

  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  const activity: ActivityListItem = useActivityListStore(
    (state) =>
      state.activityList.find((a) => a.activityId === props.activityId)!
  );

  const [center, setCenter] = useState({
    lat: 39.791,
    lng: -86.148003,
  });

  useEffect(() => {
    if (!!activity.startLatlng) {
      setCenter({ lat: activity.startLatlng[0], lng: activity.startLatlng[1] });

      if (props.stravaMap.polyLine) {
        const decodedPath = decode(props.stravaMap.polyLine).map((point) => ({
          lat: point[0],
          lng: point[1],
        }));
        setPolylinePath(decodedPath);
      }
    }
  }, [activity]);

  const bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < polylinePath.length; i++) {
    bounds.extend(
      new google.maps.LatLng(polylinePath[i].lat, polylinePath[i].lng)
    );
  }
  googleMap?.fitBounds(bounds);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
        center={center}
        zoom={11}
        onGoogleApiLoaded={({ map }) => setGoogleMap(map)}
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
