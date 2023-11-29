import React, { useEffect, useState } from "react";
import { StravaMap } from "../../models/Activity/ActivityListItem";
import useAppConfigStore from "../../stores/useAppConfigStore";
import GoogleMapReact from "google-map-react";

type ActivityMapProps = {
  stravaMap: StravaMap;
  startLatlng: number[];
  endLatlng: number[];
  zoom: number;
};

const ActivityMap: React.FC<ActivityMapProps> = (props) => {
  const googleMapsApiKey = useAppConfigStore(
    (state) => state.appConfig?.googleMapsApiKey
  );
  const [center, setCenter] = useState({
    lat: 39.791,
    lng: -86.148003,
  });

  useEffect(() => {
    console.log("startLatLng:", props.startLatlng);
    if (!!props.startLatlng)
      setCenter({ lat: props.startLatlng[0], lng: props.startLatlng[1] });
  }, [props]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
        defaultCenter={center}
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
