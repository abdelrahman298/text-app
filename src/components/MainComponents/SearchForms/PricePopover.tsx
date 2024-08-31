import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NumberComponent } from "@/components/FormComponents";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { TFunction } from "i18next";

interface IPricePopoverProps<T extends FieldValues> {
  t: TFunction;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  placeholder: string;
  width?: string;
  light?: true | false;
  errors?: FieldErrors;
  setValue: UseFormSetValue<T | any>;
}

export default function PricePopover<T extends FieldValues>({
  width = "w-full",
  placeholder,
  light = false,
  t,
  register,
  setValue,
  watch,
  errors,
}: IPricePopoverProps<T>) {
  const [open, setOpen] = useState(false);
  console.log("PricePopover");
  const min_price = watch("min_price" as any);
  const max_price = watch("max_price" as any);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        style={{ color: "#000" }}
        className={`${width} transition-shadow ${
          open ? "shadow-[0_0_0_2px]" : "shadow-[0_0_0_1px]"
        } shadow-temp_secondary  rounded-sm overflow-hidden h-11 min-h-[44px] outline-none text-base flex  round justify-between w-full px-3 items-center gap-5 ${
          light ? "bg-grey" : "bg-transparent"
        }  w-full h-full  cursor-pointer  ${
          open ? "text-temp_secondary" : "text-temp_secondary  "
        }`}
      >
        <span
          className={`${
            min_price !== "" || max_price !== ""
              ? "opacity-100"
              : " opacity-50 "
          }`}
        >
          {placeholder}
        </span>
        <FontAwesomeIcon
          className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
            min_price !== "" || max_price !== "" ? "opacity-100" : "opacity-50"
          } `}
          icon={faSort}
        />
      </PopoverTrigger>
      <PopoverContent className={`     p-0 overflow-hidden`}>
        <div
          className={`flex flex-col items-center gap-1 px-4 pt-6 pb-2 ${
            light ? "bg-grey border-grey" : "bg-background border-bg"
          }`}
        >
          <NumberComponent
            t={t}
            withIcon={false}
            register={register}
            setValue={setValue}
            errors={errors}
            name="min_price"
            placeholder={t("price.min_price.placeholder")}
            className="w-full"
            required={false}
            confirmFor
          />
          <NumberComponent
            t={t}
            withIcon={false}
            register={register}
            setValue={setValue}
            errors={errors}
            name="max_price"
            placeholder={t("price.max_price.placeholder")}
            className="w-full"
            required={false}
            confirmFor
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
