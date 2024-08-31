import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IComboBoxProps } from "@/types";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

export default function SelectBox<T extends FieldValues>({
  width = "w-full",
  setValue,
  setSearchParams,
  searchParams,
  stateName,
  placeholder,
  data,
  light = false,
  getDefaultValueFromURL,
  isSuccess,
}: IComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setSelectedItem("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      const id = data?.find(
        (item) =>
          Number(item.id) ===
          Number(searchParams.get(`${getDefaultValueFromURL}`))
      )?.id;
      console.log("the selected item data   " + JSON.stringify(data));
      console.log("the selected item ID   " + id);

      if (id) {
        //!to handle the case if the user enters in the url an id tat doesn't exist, so it prevents setting the value to undefined or ull
        setSelectedItem(id.toString());
      } else setSelectedItem("");
    }

    // console.log("the selected item ID " + data);
    // console.log("the selected item data" + JSON.stringify(data));
  }, [data, getDefaultValueFromURL, searchParams]);
  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={selectedItem}
      onValueChange={(currentValue) => {
        setSelectedItem(currentValue);
        setValue && setValue(stateName, currentValue);
        setSearchParams &&
          setSearchParams((params) => {
            params.set("srt", currentValue);
            return params;
          });
      }}
    >
      <SelectTrigger
        className={`${width} transition-shadow ${
          open ? "shadow-[0_0_0_2px]" : "shadow-[0_0_0_1px]"
        } shadow-temp_secondary  rounded-sm overflow-hidden h-11 outline-none truncate  `}
      >
        <div
          className={`selected-item rtl:rtl text-base flex outline-none round justify-between w-full px-3 items-center gap-5 ${
            light ? "bg-grey" : "bg-transparent"
          }  w-full h-full  cursor-pointer  ${
            selectedItem ? "#000" : "#000  "
          }`}
        >
          <span className={`${selectedItem ? "opacity-100" : " opacity-50 "}`}>
            <SelectValue placeholder={placeholder} />
          </span>

          <FontAwesomeIcon
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              selectedItem ? "opacity-100" : "opacity-50"
            } `}
            icon={faSort}
          />
        </div>
      </SelectTrigger>
      <SelectContent
        className={` ${
          light ? "bg-grey border-grey" : "bg-background border-bg"
        } `}
        position="popper"
      >
        <SelectGroup>
          {data?.map((item) => (
            //! if we put the check icon here it will be displayed also in the select trigger
            <SelectItem
              textValue={item?.id}
              showCheckIcon={selectedItem === item?.id?.toString()}
              className={`${
                light
                  ? "focus:bg-temp_secondary focus:text-background"
                  : "focus:bg-temp_secondary focus:text-background"
              } ${
                selectedItem === item?.id?.toString()
                  ? "bg-temp_secondary text-background"
                  : "pl-8 rtl:pl-0 rtl:pr-8 "
              } rtl:rtl`}
              key={item?.id}
              value={item?.id?.toString()}
            >
              {item?.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
