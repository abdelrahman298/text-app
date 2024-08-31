import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import {
  faArrowUpFromBracket,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";

function UploadFileComponent<T extends FieldValues>({
  register,
  watch,
  name,
  label = "",
  required = true,
  validations = {},
  errors,
  ServerErrors,
  className = "w-1/2 md:w-full",
  inputStyle,

  Bgcolor = "light",
  btnText,
  serverFileSrc,
  fileFor,
  t,
  placeholder,
  confirmFor,
}: IFormElementProps<T>) {
  const [uploadedFileSrc, setUploadedFileSrc] = useState("");
  useEffect(() => {
    const subscription = watch((input) => {
      if (input?.[name]?.[0]?.name?.length > 0) {
        const imageUrl = URL.createObjectURL(input?.[name]?.[0]);
        setUploadedFileSrc(imageUrl);
      } else {
        setUploadedFileSrc("");
      }
    });

    return () => {
      subscription.unsubscribe();
      //! also revoke if the for has submitted successfully
      URL.revokeObjectURL(uploadedFileSrc);
    };
  }, [name, uploadedFileSrc, watch]);

  return (
    <>
      <label
        className={cn(
          ` flex w-fit max-w-max flex-col items-start text-lg justify-center gap-2 `,
          className
        )}
        htmlFor={name}
      >
        <h4>{label} </h4>
        <div
          className={`w-40 aspect-square overflow-hidden bg-grey flex-center trns cursor-pointer ${
            fileFor === "property"
              ? "rounded-md !bg-slate-200"
              : fileFor === "user"
              ? "rounded-full p-1 border-2 border-temp_secondary "
              : ""
          } ${uploadedFileSrc ? " border-opacity-100" : "border-opacity-50"}`}
        >
          {serverFileSrc || uploadedFileSrc ? (
            <img
              className={`w-full  h-full object-cover ${
                fileFor === "user" ? "rounded-full" : ""
              }`}
              src={uploadedFileSrc || serverFileSrc}
              alt="img"
            />
          ) : (
            <FontAwesomeIcon
              className="text-8xl opacity-50"
              icon={fileFor === "user" ? faUser : faImage}
            />
          )}
        </div>

        <div className="w-40 h-9 cursor-pointer flex-center  overflow-hidden border-2 border-temp_secondary rounded-md relative bg-temp_secondary text-background trns hover:bg-background hover:text-temp_secondary active:scale-90  mt-2">
          <input
            className={`  w-full  opacity-0 !h-9`}
            type="file"
            id={name}
            name={name}
            accept="image/jpg, image/jpeg, image/png, image/webp"
            {...register(name, {
              required: required,
              validate: (value) => value && !(value?.[0]?.size > 5000000),
            })}
          />
          <div className="absolute left-0 top-0 text-base flex-center gap-2 h-full w-full pointer-events-none">
            <FontAwesomeIcon icon={faArrowUpFromBracket} /> {btnText}
          </div>
        </div>
        {errors?.[name] && (
          <p className="pt-2 text-xs text-error">
            {errors[name].type === "required" &&
              t(`validations.${name}.required`)}

            {errors[name].type === "validate" &&
              t(`validations.${name}.validate`)}
          </p>
        )}
        {
          //!--- server errors --------
          ServerErrors && (
            <p className="pt-2 text-xs text-error">{ServerErrors}</p>
          )
        }
      </label>
    </>
  );
}

export default UploadFileComponent;
