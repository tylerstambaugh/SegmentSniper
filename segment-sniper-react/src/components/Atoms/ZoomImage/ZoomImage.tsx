import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export type ZoomImageProps = {
  image: string;
  alt: string;
};

export const ZoomImage = ({ image, alt }: ZoomImageProps) => {
  return (
    <Zoom>
      <img src={image} alt={alt} />;
    </Zoom>
  );
};
