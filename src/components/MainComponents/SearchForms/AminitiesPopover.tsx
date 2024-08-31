import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CheckBox } from "@/components/FormComponents";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IaminitiesPopoverProps<T extends FieldValues> {
  data: { id: number; title: string }[];
  register: UseFormRegister<T>;
  watch: (name: string) => void;
  placeholder: string;
  width?: string;
  light?: true | false;
  sidebar?: true | false;
}

export default function AminitiesPopover<T extends FieldValues>({
  width = "w-full",
  placeholder,
  light = false,

  register,
  watch,
  data,
  sidebar,
}: IaminitiesPopoverProps<T>) {
  const [open, setOpen] = useState(false);
  console.log("aminitiesPopover");
  const aminities = watch("aminities") as unknown as [];

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
            aminities?.length > 0 ? "opacity-100" : " opacity-50 "
          }`}
        >
          {placeholder}
        </span>
        <FontAwesomeIcon
          className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
            aminities?.length > 0 ? "opacity-100" : "opacity-50"
          } `}
          icon={faSort}
        />
      </PopoverTrigger>
      <PopoverContent className={`PopoverContent    p-0 overflow-hidden`}>
        <ul
          style={{ color: "#000" }}
          className={`property__aminities p-4 w-full grid grid-cols-2 ${
            sidebar ? "4xl:grid-cols-1 lg:grid-cols-2" : ""
          }   md:grid-cols-1 gap-5 max-h-72 overflow-y-auto overflow-x-hidden ${
            light ? "bg-grey border-grey" : "bg-background border-bg"
          }`}
        >
          {data?.map((amenity, index) => (
            <CheckBox
              className="text-sm"
              key={amenity.id}
              register={register}
              name={`aminities.${index}`}
              label={amenity.title}
              value={amenity.id}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
