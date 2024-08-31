import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues } from "react-hook-form";

function EmailComponent<T extends FieldValues>({
  register,
  name,
  label = "",
  placeholder,
  required = true,
  validations = {},
  dirtyFields,
  errors,
  ServerErrors,
  className,
  inputStyle,
  dir,
  value,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  t,
  disabled = false,
  color,
}: IFormElementProps<T>) {
  return (
    <label
      style={{ color }}
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
          style={{ color }}
          className={`text-lg  ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } trns ${errors?.[name] || ServerErrors ? " text-error " : ""}`}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-2 w-full ">
        <input
          style={{ color: color }}
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
          id={name}
          placeholder={placeholder}
          name={name}
          autoComplete="on"
          {...register(name, {
            required: required,
            pattern: /^[A-z][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            ...validations,
          })}
        />
        {withIcon && (
          <FontAwesomeIcon
            className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 ${
              dirtyFields?.[name] ? "opacity-100" : "opacity-50"
            } ${label ? "top-[49px]" : "top-[13px]"} ${
              errors?.[name] || ServerErrors ? " text-error " : ""
            }`}
            icon={faEnvelope}
          />
        )}
        {errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {errors?.[name]?.type === "required" &&
              t(`validations.${name}.required`)}
            {errors?.[name]?.type === "pattern" &&
              t(`validations.${name}.pattern`)}
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

export default EmailComponent;
