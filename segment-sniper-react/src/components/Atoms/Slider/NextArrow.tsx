import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </Button>
  );
}
