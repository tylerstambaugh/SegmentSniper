import { faMapMarkerAlt as mapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MapMarkerProps {
  lat: number;
  lng: number;
  text: string;
  isStart: boolean;
}

export const MapMarker = ({ lat, lng, text, isStart }: MapMarkerProps) => {
  const markerStyle = {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
    color: isStart ? "green" : "red",
  };

  return (
    <>
      <div style={markerStyle}>
        <FontAwesomeIcon icon={mapMarkerAlt} size="2xl" />
      </div>
    </>
  );
};

export default MapMarker;
