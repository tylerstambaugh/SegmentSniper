import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={faChevronCircleLeft} />
    </Button>
  );
}
