import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <Button onClick={onClick} className="py-5">
    <FontAwesomeIcon icon={faChevronCircleRight} className="px-1" />
  </Button>
);

export default NextArrow;