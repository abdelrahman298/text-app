import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface IRadioInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors;
  name: Path<T>;
  label: string;
  id?: number | string;
  ServerErrors?: string;
  width?: string;
  Bgcolor?: "light" | "dark";
  className?: string;
}
function RadioInput<T extends FieldValues>({
  register,
  name,
  label,
  id,
  errors,
  ServerErrors,
  width = "",
  Bgcolor = "light",
  className,
}: IRadioInputProps<T>) {
  return (
    <label
      //title={label}
      className={cn(
        `flex w-fit gap-3 items-start  justify-center custom_checkbox cursor-pointer ${
          Bgcolor === "dark" ? "text-bg" : "text-temp_secondary"
        }  text-md ${width} `,
        className
      )}
      htmlFor={id}
    >
      <input
        id={id}
        name={id}
        value={id}
        className="hidden"
        type="radio"
        {...register(name, { valueAsNumber: true })}
      />
      <svg className="overflow-visible h-4 w-4 mt-[3px]" viewBox="0 0 64 64">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path fill-none stroke-temp_secondary stroke-[6]"
        ></path>
      </svg>

      {label}
    </label>
  );
}

export default RadioInput;
