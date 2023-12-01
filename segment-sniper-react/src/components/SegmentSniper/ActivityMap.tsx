import React, { useEffect, useState } from "react";
import {
  ActivityListItem,
  StravaMap,
} from "../../models/Activity/ActivityListItem";
import useAppConfigStore from "../../stores/useAppConfigStore";
import GoogleMapReact from "google-map-react";
import useActivityListStore from "../../stores/useActivityListStore";

type ActivityMapProps = {
  stravaMap: StravaMap;
  zoom: number;
  activityId: string;
};

const ActivityMap: React.FC<ActivityMapProps> = (props) => {
  const googleMapsApiKey = useAppConfigStore(
    (state) => state.appConfig?.googleMapsApiKey
  );

  const activity: ActivityListItem = useActivityListStore(
    (state) =>
      state.activityList.find((a) => a.activityId === props.activityId)!
  );

  const [center, setCenter] = useState({
    lat: 39.791,
    lng: -86.148003,
  });

  useEffect(() => {
    console.log("startLatLng:", activity.startLatlng);
    if (!!activity.startLatlng)
      setCenter({ lat: activity.startLatlng[0], lng: activity.startLatlng[1] });
  }, [activity]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
        center={center}
        defaultZoom={props.zoom}
      >
        {/* Your map components go here */}

        {/* {props.stravaMap.polyline && (
          <Polyline
          path={props.stravaMap.polyline.path}
          options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
            />
        )} */}
      </GoogleMapReact>
    </div>

    // const Polyline = ({ path, options }) => {
    //   const polyline = new window.google.maps.Polyline({
    //     path: path,
    //     ...options,
    //   });
  );
};

export default ActivityMap;
