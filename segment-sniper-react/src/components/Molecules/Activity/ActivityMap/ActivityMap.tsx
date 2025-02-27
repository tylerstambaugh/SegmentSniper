import React, { useMemo, useRef } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";
import { decode } from "@mapbox/polyline";
import { StravaMap } from "../../../../models/StravaMap";

type ActivityMapProps = {
  stravaMap: StravaMap;
  startLatlng?: number[];
  endLatlng?: number[];
};

const mapContainerStyle = { minHeight: "250px", height: "100%", width: "100%" };

const ActivityMap: React.FC<ActivityMapProps> = (props) => {

  // const mapRef = useRef<google.maps.Map | null>(null);

  const polylinePath = useMemo(() => {
    if (props.stravaMap.polyLine) {
      return decode(props.stravaMap.polyLine).map((point) => ({
        lat: point[0],
        lng: point[1],
      }));
    }
    return [];
  }, [props.stravaMap.polyLine]);


  const center = useMemo(() => {
    if (props.startLatlng && props.startLatlng.length >= 2) {
      return { lat: props.startLatlng[0], lng: props.startLatlng[1] };
    }
    return { lat: 0, lng: 0 };
  }, [props.startLatlng]);

  const onLoad = (map: google.maps.Map) => {
    // if (!mapRef.current) {
    //   mapRef.current = map;

    if (polylinePath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      polylinePath.forEach(({ lat, lng }) => bounds.extend(new google.maps.LatLng(lat, lng)));
      map.fitBounds(bounds);
    }

  };


  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      options={{
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, // or `DROPDOWN_MENU`
          position: google.maps.ControlPosition.TOP_RIGHT, // Customize position
        },
      }}
    >
      {polylinePath.length > 0 && (
        <Polyline path={polylinePath} options={{ strokeColor: "#FF0000" }} />
      )}
      {props.startLatlng && props.startLatlng.length >= 2 && (
        <Marker position={{ lat: props.startLatlng[0], lng: props.startLatlng[1] }} label="S" />
      )}
      {props.endLatlng && props.endLatlng.length >= 2 && (
        <Marker position={{ lat: props.endLatlng[0], lng: props.endLatlng[1] }} label="E" />
      )}
    </GoogleMap>
  );
};

export default ActivityMap;