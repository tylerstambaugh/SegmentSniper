
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <Button onClick={onClick} className="my-auto">
    <FontAwesomeIcon icon={faChevronCircleLeft} className="px-1" />
  </Button>
);
