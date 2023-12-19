import { useState } from "react";
import ReactSlider from "react-slider";

interface SliderProps {
  onChange: (value: number) => void;
  value: number | undefined;
  min: number;
  max: number;
  disabled: boolean;
}

const Slider = ({ onChange, value, min, max, disabled }: SliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
    setSliderValue(newValue);
  };

  return (
    <ReactSlider
      className={`customSlider ${disabled ? "disabledSlider" : ""}`}
      trackClassName="customSlider-track"
      thumbClassName="customSlider-thumb"
      markClassName="customSlider-mark"
      marks={25}
      min={min}
      max={max}
      defaultValue={sliderValue}
      value={sliderValue || 0}
      onChange={(value) => handleSliderChange(value)}
      disabled={disabled}
    />
  );
};

export default Slider;
