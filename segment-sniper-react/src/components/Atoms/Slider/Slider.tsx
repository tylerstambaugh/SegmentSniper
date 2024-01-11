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
  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
  };

  return (
    <ReactSlider
      className={`customSlider ${disabled ? "disabledSlider" : ""}`}
      trackClassName="customSlider-track"
      thumbClassName="customSlider-thumb"
      markClassName="customSlider-mark"
      min={min}
      max={max}
      defaultValue={value}
      value={value || 0}
      onChange={(value) => handleSliderChange(value)}
      disabled={disabled}
    />
  );
};

export default Slider;
