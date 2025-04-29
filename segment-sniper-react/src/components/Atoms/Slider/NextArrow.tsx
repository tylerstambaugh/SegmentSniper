import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <Button onClick={onClick} className="my-auto">
    <FontAwesomeIcon icon={faChevronCircleRight} className="px-1" />
  </Button>
);
