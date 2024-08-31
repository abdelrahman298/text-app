import { cn } from "@/lib/utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type RatingComponentProps<T extends FieldValues> = {
  defaultRating?: number;
  unMutable?: boolean;
  setValue?: UseFormSetValue<T>;
  stateName?: string;
  rating?: number;
  placeholder?: string;
  className?: string;
};
function RatingComponent<T extends FieldValues>({
  defaultRating,
  setValue,
  stateName,
  rating,
  placeholder,
  unMutable,
  className,
}: RatingComponentProps<T>) {
  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = unMutable ? defaultRating : rating;

  return (
    <div
      className={cn("w-full flex justify-start gap-3 items-center ", className)}
    >
      {placeholder && <p className="opacity-50"> {placeholder}</p>}
      <div className="h-[45px]  flex items-center gap-0.5 rtl:ltr">
        {[...Array(5)].map((index, star?) =>
          unMutable ? (
            <FontAwesomeIcon
              className={`trns   ${
                defaultRating > index
                  ? "text-yellow-400"
                  : "text-temp_secondary opacity-20"
              }`}
              key={index}
              icon={faStar}
            />
          ) : (
            <FontAwesomeIcon
              className={`trns cursor-pointer  ${
                (hoverRating || currentRating) > index
                  ? "text-yellow-400"
                  : "text-temp_secondary opacity-20"
              }`}
              onClick={() => setValue(stateName as any, index + 1)}
              onMouseOver={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(null)}
              key={index}
              icon={faStar}
            />
          )
        )}
      </div>
    </div>
  );
}

export default RatingComponent;
