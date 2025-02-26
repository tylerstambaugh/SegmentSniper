import React, { useMemo, useRef } from "react";
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";
import { decode } from "@mapbox/polyline";
import { StravaMap } from "../../../../models/StravaMap";

type ActivityMapProps = {
  stravaMap: StravaMap;
  startLatlng?: number[];
  endLatlng?: number[];
};

const mapContainerStyle = { minHeight: "250px", height: "100%", width: "100%" };

const ActivityMap: React.FC<ActivityMapProps> = (props) => {

  const mapRef = useRef<google.maps.Map | null>(null);

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
    mapRef.current = map;
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

export default React.memo(ActivityMap);



// OLD FILE
// import React, { useEffect, useMemo, useState } from "react";
// import useAppConfigStore from "../../../../stores/useAppConfigStore";
// import GoogleMapReact from "google-map-react";
// import { decode } from "@mapbox/polyline";
// import Polyline from "../../../Atoms/Polyline";
// import { StravaMap } from "../../../../models/StravaMap";
// import MapMarker from "../../../Atoms/MapMarker";

// type ActivityMapProps = {
//   stravaMap: StravaMap;
//   startLatlng?: number[];
//   endLatlng?: number[];
// };

// const ActivityMap: React.FC<ActivityMapProps> = React.memo((props) => {
//   const googleMapsApiKey = useAppConfigStore(
//     (state) => state.appConfig?.googleMapsApiKey
//   );

//   const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
//   const [mapInitialized, setMapInitialized] = useState(false);
//   // const [polylinePath, setPolylinePath] = useState<
//   //   { lat: number; lng: number }[]
//   // >([]);

//   const polylinePath = useMemo(() => {
//     if (props.stravaMap.polyLine) {
//       return decode(props.stravaMap.polyLine).map((point) => ({
//         lat: point[0],
//         lng: point[1],
//       }));
//     }
//     return [];
//   }, [props.stravaMap.polyLine]);

//   // const memoizedPolylinePath = useMemo(() => {
//   //   if (props.stravaMap.polyLine) {
//   //     return decode(props.stravaMap.polyLine).map((point) => ({
//   //       lat: point[0],
//   //       lng: point[1],
//   //     }));
//   //   }
//   //   return [];
//   // }, [props.stravaMap.polyLine]);

//   // const center = useMemo(() => {
//   //   return { lat: props.startLatlng![0], lng: props.startLatlng![1] };
//   // }, [props.startLatlng]);

//   const center = useMemo(() => {
//     if (props.startLatlng && props.startLatlng.length >= 2) {
//       return { lat: props.startLatlng[0], lng: props.startLatlng[1] };
//     }
//     return { lat: 0, lng: 0 }; // Fallback value
//   }, [props.startLatlng]);


//   function configureMap(map: google.maps.Map) {
//     setGoogleMap(map);
//     if (props.startLatlng) {
//       //setPolylinePath(memoizedPolylinePath);
//       setMapInitialized(true);
//     }
//   }

//   // async function defineBounds() {
//   //   if (googleMap && polylinePath.length > 0) {
//   //     const bounds = new window.google.maps.LatLngBounds();
//   //     for (let i = 0; i < polylinePath.length; i++) {
//   //       bounds.extend(
//   //         new google.maps.LatLng(polylinePath[i].lat, polylinePath[i].lng)
//   //       );
//   //     }
//   //     googleMap?.fitBounds(bounds);
//   //   }
//   // }

//   // useEffect(() => {
//   //   if (mapInitialized) {
//   //     defineBounds();
//   //   }
//   // }, [mapInitialized]);

//   useEffect(() => {
//     if (googleMap && polylinePath.length > 0) {
//       const bounds = new window.google.maps.LatLngBounds();
//       polylinePath.forEach(({ lat, lng }) => {
//         bounds.extend(new google.maps.LatLng(lat, lng));
//       });
//       googleMap.fitBounds(bounds);
//     }
//   }, [googleMap, polylinePath]);


//   return (
//     <div style={{ minHeight: "250px", height: "100%", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: `${googleMapsApiKey}` }}
//         center={center}
//         defaultZoom={11}
//         onGoogleApiLoaded={async ({ map }) => {
//           await configureMap(map);
//         }}
//         yesIWantToUseGoogleMapApiInternals={true}
//       >
//         {polylinePath.length > 0 && (
//           <Polyline
//             map={googleMap}
//             path={polylinePath}
//             options={{ strokeColor: "#FF0000" }}
//           />
//         )}
//         {/* <MapMarker
//           lat={props.startLatlng![0]}
//           lng={props.startLatlng![1]}
//           text="Start"
//           isStart={true}
//         />
//         <MapMarker
//           lat={props.endLatlng![0]}
//           lng={props.endLatlng![1]}
//           text="End"
//           isStart={false}
//         /> */}
//         {props.startLatlng && props.startLatlng.length >= 2 && (
//           <MapMarker
//             lat={props.startLatlng[0]}
//             lng={props.startLatlng[1]}
//             text="Start"
//             isStart={true}
//           />
//         )}

//         {props.endLatlng && props.endLatlng.length >= 2 && (
//           <MapMarker
//             lat={props.endLatlng[0]}
//             lng={props.endLatlng[1]}
//             text="End"
//             isStart={false}
//           />
//         )}
//       </GoogleMapReact>
//     </div>
//   );
// });

// export default ActivityMap;
