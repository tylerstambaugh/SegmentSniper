import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <Button onClick={onClick} className="my-auto">
      <FontAwesomeIcon icon={faChevronCircleRight} className="px-1" />
    </Button>
  );
}
