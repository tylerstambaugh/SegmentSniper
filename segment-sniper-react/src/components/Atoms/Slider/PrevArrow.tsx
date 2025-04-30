
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <Button onClick={onClick} className="py-5">
    <FontAwesomeIcon icon={faChevronCircleLeft}
      className="px-1" />
  </Button>
);

export default PrevArrow;