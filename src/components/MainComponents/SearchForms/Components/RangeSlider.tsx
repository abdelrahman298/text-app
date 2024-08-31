import { useExternalData } from "@/Hooks/useAxios";
import { Slider } from "@/components/ui/slider";
import { TFunction } from "i18next";
import { useState } from "react";
import { defaultData } from "../../../../Utilities/style.js";

type RangeSliderProps = {
  defaultValue: any;
  min: number;
  max: number;
  step: number;
  minStepsBetweenThumbs: number;
  onValueCommit: (value: number[]) => void;
  name: string;
  label: string;
  t: TFunction;
  measurement?: string;
};
export default function RangeSlider({
  defaultValue,
  min,
  max,
  step,
  minStepsBetweenThumbs,
  measurement,
  onValueCommit,
  name,
  label,
  t,
}: RangeSliderProps) {
  const [values, setValues] = useState({
    min: defaultValue[0],
    max: defaultValue[1],
  });
  const { data: externalData } = useExternalData();

  return (
    <div className="flex flex-col gap-4 text-temp_secondary">
      <h3 className="range_slider--title text-lg ">
        <span style={{ color: defaultData.color }}>{label}</span>
      </h3>
      <Slider
        SystemColor={defaultData.color}
        onValueChange={(value) => setValues({ min: value[0], max: value[1] })}
        onValueCommit={onValueCommit}
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
      />
      <div className="range_slider--values flex justify-between items-center rtl:flex-row-reverse">
        <h4 className="range_slider--values--min text-sm">
          {t("value_formatted", { value: values.min })}{" "}
          <span className="font-bold">{measurement}</span>
        </h4>
        <h4 className="range_slider--values--min text-sm">
          {t("value_formatted", { value: values.max })}{" "}
          <span className="font-bold">{measurement}</span>
        </h4>
      </div>
    </div>
  );
}
