import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IComboBoxProps } from "@/types";
import { lang } from "@/app/Features/MiscellaneousSlice";
import { useAppSelector } from "@/app/reduxHooks";
import { FieldValues } from "react-hook-form";

export default function ComboBox<T extends FieldValues>({
  width = "w-full",
  setValue,
  setSearchParams,
  searchParams,
  stateName,
  placeholder,
  data,
  light = false,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  selectBox,
  isSuccess,
  callBcFn,
  color,
}: IComboBoxProps<T>) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  console.log("ComboBox");

  useEffect(() => {
    if (isSuccess) {
      setSelectedItem("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      const title = data?.find(
        (item) =>
          Number(item.id) ===
          Number(searchParams.get(`${getDefaultValueFromURL}`))
      )?.title;

      if (title) {
        //!to handle the case if the user enters in the url an id tat doesn't exist, so it prevents setting the value to undefined or ull
        setSelectedItem(title.toLowerCase());
      } else setSelectedItem(null);
    }
  }, [data, getDefaultValueFromURL, searchParams]);

  const lng = useAppSelector(lang);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        //! here we control the shadow
        className={`${width} transition-shadow ${
          open ? "shadow-[0_0_0_2px]" : "shadow-[0_0_0_1px]"
        } shadow-temp_secondary  rounded-sm overflow-hidden h-11 outline-none`}
      >
        <div
          //! here we control the background

          className={`selected-item text-base flex outline-none round justify-between w-full px-3 items-center gap-5 ${
            light ? "bg-background" : "bg-transparent"
          }  w-full h-full  cursor-pointer  ${
            selectedItem ? "#000" : "#000  "
          }`}
        >
          <span className={` ${selectedItem ? "opacity-100" : " opacity-50 "}`}>
            {selectedItem
              ? data?.find(
                  (item) => item?.title?.toLowerCase() === selectedItem
                )?.title
              : placeholder}
          </span>
          <FontAwesomeIcon
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              selectedItem ? "opacity-100" : "opacity-50"
            } `}
            icon={faSort}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent  p-0">
        <Command
          className={` ${
            light ? "bg-grey border-grey" : "bg-background border-bg"
          }`}
        >
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none " : "h-12 "
            }  w-full   ${
              light ? "bg-grey justify-start" : "bg-background justify-between"
            } `}
          >
            <CommandInput
              className={` placeholder:text-temp_secondary placeholder:opacity-50 placeholder:font-medium rounded-sm `}
              autoFocus={light ? false : true}
              placeholder={`${lng === "ar" ? "ابحث ..." : "Search ..."} `}
            />
          </div>
          <CommandEmpty>
            {lng === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
          </CommandEmpty>{" "}
          <CommandGroup className="h-fit max-h-72 overflow-y-auto">
            {data?.map((item) => (
              <CommandItem
                className={`   hover:bg-secondary 
                ${
                  light
                    ? "aria-selected:bg-temp_secondary aria-selected:text-background"
                    : "aria-selected:bg-temp_secondary aria-selected:text-background"
                } ${
                  selectedItem === item?.title?.toLowerCase()
                    ? "bg-temp_secondary text-background"
                    : "pl-8 rtl:pl-0 rtl:pr-8"
                } `}
                key={item?.id}
                value={item?.title}
                onSelect={(currentValue) => {
                  //!it converts to lower case by default
                  console.log("currentValue", currentValue);

                  setSelectedItem(
                    currentValue === selectedItem ? "" : currentValue
                  );
                  setValue && setValue(stateName, item?.id);
                  setSearchParams &&
                    setSearchParams((params) => {
                      params.set("srt", item?.id as any);
                      return params;
                    });
                  callBcFn && callBcFn(item?.id);
                  setOpen(false);
                }}
              >
                {selectedItem === item?.title?.toLowerCase() && (
                  <FontAwesomeIcon
                    className={cn("mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4")}
                    icon={faCheck}
                  />
                )}

                {item?.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
