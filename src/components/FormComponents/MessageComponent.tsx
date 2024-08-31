import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldValues } from "react-hook-form";

function MessageComponent<T extends FieldValues>({
  register,
  errors,
  placeholder,
  ServerErrors,
  className,
  rows = 4,
  Bgcolor = "light",
  t,
  label,
  withIcon,
  dirtyFields,
  inputStyle,
}: IFormElementProps<T>) {
  return (
    <label
      className={cn(
        `flex  flex-col items-start justify-start gap-2 relative `,
        className
      )}
      htmlFor="message"
    >
      {label && (
        <h3
          className={`text-lg   trns ${
            errors?.message || ServerErrors ? " text-error " : ""
          }`}
        >
          {label}
        </h3>
      )}

      <textarea
        placeholder={placeholder}
        className={`resize-none peer ${
          withIcon && "pl-9 or focus:pl-9 rtl:pl-0 rtl:pr-9 rtl:focus:pr-9 "
        }   w-full h-auto ${inputStyle} ${
          Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
        } ${
          errors?.message || ServerErrors
            ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
            : ""
        }`}
        {...register("message", {
          required: true,
          minLength: 3,
        })}
        name="message"
        id="message"
        cols={40}
        rows={rows}
      ></textarea>
      {withIcon && (
        <FontAwesomeIcon
          className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 ${
            dirtyFields?.message ? "opacity-100" : "opacity-50"
          } ${label ? "top-[49px]" : "top-[13px]"} ${
            errors?.message || ServerErrors ? " text-error " : ""
          }`}
          icon={faMessage}
        />
      )}

      {errors?.message && (
        <p className=" text-xs text-error">
          {errors?.message.type === "required" &&
            t(`validations.message.required`)}
          {errors?.message.type === "minLength" &&
            t(`validations.message.minLength`)}
        </p>
      )}
      {
        //!--- server errors --------
        ServerErrors && <p className=" text-xs text-error">{ServerErrors}</p>
      }
    </label>
  );
}

export default MessageComponent;
