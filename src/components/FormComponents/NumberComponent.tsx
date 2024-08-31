import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues } from "react-hook-form";

function NumberComponent<T extends FieldValues>({
  register,
  setValue,
  name,
  label = "",
  placeholder,
  dirtyFields,
  required = true,
  validations = {},
  errors,
  ServerErrors,
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  icon = "user",
  t,
  disabled = false,
  className,
}: IFormElementProps<T>) {
  console.log("NumberComponent");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/,/g, ""));

    // Format the value with commas and update the form value
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toLocaleString("en-US");
      setValue?.(name, formattedValue as any);
    } else {
      setValue?.(name, "" as any);
    }
  };
  return (
    <label
      className={cn(
        `flex w-1/2 md:w-full   ${
          alignment === "vertical"
            ? "flex-col gap-2 items-start "
            : "gap-6   md:h-auto  items-center md:flex-col md:gap-2 md:items-start"
        } ${label ? "h-[105px]" : "h-[70px]"} justify-start relative  `,
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={`text-lg  ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } trns ${errors?.[name] || ServerErrors ? " text-error " : ""}`}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-2 w-full ">
        <input
          dir={dir}
          disabled={disabled}
          className={`w-full peer ${
            withIcon && "pl-9 focus:pl-9 rtl:pl-0 rtl:pr-9 rtl:focus:pr-9 "
          }  ${
            Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
          } ${inputStyle} ${
            errors?.[name] || ServerErrors
              ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
              : ""
          }`}
          type="text"
          inputMode="numeric"
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(`${name}`, {
            required: required,
            pattern: /^[0-9,]+$/,
            min: 0,
            ...validations,
          })}
          onKeyUp={(e) => {
            handleInputChange(e as any);
            // Add any other onChange logic here if needed
          }}
        />
        {withIcon && (
          <FontAwesomeIcon
            className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 ${
              dirtyFields?.[name] ? "opacity-100" : "opacity-50"
            } ${label ? "top-[49px]" : "top-[13px]"} ${
              errors?.[name] || ServerErrors ? " text-error " : ""
            }`}
            icon={icon === "offer" ? faCommentDollar : faCommentDollar}
          />
        )}
        {errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {errors?.[name]?.type === "required" &&
              t(`validations.${name}.required`)}
            {(errors?.[name]?.type === "pattern" ||
              errors?.[name]?.type === "min") &&
              t([`validations.${name}.pattern`, `validations.${name}.min`])}
          </p>
        )}

        {
          //!--- server errors --------

          ServerErrors && (
            <p className="pt-2 text-xs text-error">{ServerErrors}</p>
          )
        }
      </div>
    </label>
  );
}

export default NumberComponent;
