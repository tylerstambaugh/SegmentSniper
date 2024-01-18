import React, { useEffect } from "react";

type PolylineProps = {
  path: google.maps.LatLngLiteral[];
  options: google.maps.PolylineOptions;
  map: google.maps.Map | null;
};

const Polyline: React.FC<PolylineProps> = ({ path, options, map }) => {
  useEffect(() => {
    if (!map) return;

    const polyline = new window.google.maps.Polyline({
      path: path,
      ...options,
    });

    polyline.setMap(map);

    return () => {
      if (polyline.getMap()) {
        polyline.setMap(null);
      }
    };
  }, [path, options, map]);

  return null;
};

export default Polyline;
