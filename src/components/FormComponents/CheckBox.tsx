import { cn } from "../../lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface ICheckBoxProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors;
  name: Path<T> | any;
  label: string;
  value?: number | string;
  ServerErrors?: string;
  className?: string;
  Bgcolor?: "light" | "dark";
  children?: React.ReactNode | string;
  required?: boolean;
}
function CheckBox<T extends FieldValues>({
  register,
  name,
  label,
  value,
  errors,
  ServerErrors,
  className = "",
  Bgcolor = "light",
  children,
  required = false,
}: ICheckBoxProps<T>) {
  return (
    <label
      //title={label}
      className={cn(
        `flex w-fit gap-3 items-center   justify-center custom_checkbox cursor-pointer ${
          Bgcolor === "dark" ? "text-background" : "text-temp_secondary"
        }   `,
        className
      )}
      htmlFor={name}
    >
      <input
        id={name}
        name={name}
        className="hidden"
        type="checkbox"
        defaultValue={value}
        {...register(name, { valueAsNumber: true, required: required })}
      />
      <svg className="overflow-visible h-4 w-4 mt-[3px]" viewBox="0 0 64 64">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path fill-none stroke-temp_secondary stroke-[6]"
        ></path>
      </svg>

      {children ? children : label}
    </label>
  );
}

export default CheckBox;
