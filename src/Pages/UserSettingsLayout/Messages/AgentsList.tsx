import { cn } from "@/lib/utils";
import { TFunction } from "i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo, useState } from "react";
import useDebounce from "@/Hooks/useDebounce";
import AgentsSlider from "./AgentsSlider";
import { useFetchData } from "@/Hooks/useAxios";
import { ErrorMessage, NoItemsMessage } from "@/components/SubComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type AgentsListProps = {
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | number>>;
  selectedChatId: string | number;
  t: TFunction;
  className?: string;
};

function AgentsList({
  className,
  t,
  setSelectedChatId,
  selectedChatId,
}: AgentsListProps) {
  const { data, isPending, isError, isPaused } = useFetchData(
    "USER_MESSAGES_LIST",
    import.meta.env.VITE_USER_MESSAGES_LIST,
    false,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000
  );

  const [filteredText, setFilteredText] = useState("");
  const debouncedFilteredText = useDebounce(filteredText);

  const filteredAgentsList = useMemo(() => {
    return data?.filter((item) =>
      item?.name
        ?.toLowerCase()
        ?.includes((debouncedFilteredText as string)?.toLowerCase())
    );
  }, [data, debouncedFilteredText]);

  return (
    <div
      className={cn(
        "w-full rounded-lg pb-5 h-full md:h-auto overflow-y-auto bg-grey relative text-temp_secondary",
        className
      )}
    >
      <div className="w-full px-4 h-24 flex-center bg-grey sticky top-0 z-20 shadow-sm ">
        <input
          autoFocus
          className="w-full dark-bg-inputs "
          type="search"
          value={filteredText}
          onChange={(e) => setFilteredText(e.target.value)}
          name="search"
          autoComplete="off"
          id="search"
          placeholder={t("AgentsList.search.placeholder")}
        />
      </div>
      <div
        className={`hidden md:block mt-5 ${
          filteredAgentsList?.length === 0 && "hidden"
        }`}
      >
        <AgentsSlider
          data={filteredAgentsList}
          className="agents__msgs--slider "
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
        {filteredAgentsList?.length === 0 && (
          <p className="w-full text-center text-sm text-red-500">
            {t("AgentsList.NoItemsMessage")}
          </p>
        )}
      </div>
      <ul
        className={`agents__msgs--list w-full flex flex-col gap-5 mt-5   md:hidden ${
          (isError ||
            isPaused ||
            isPending ||
            filteredAgentsList?.length === 0) &&
          "items-center h-[400px] justify-center"
        }`}
      >
        {isError || isPaused ? (
          <ErrorMessage
            className="text-center px-1 text-red-500"
            message={t("AgentsList.ErrorMessage")}
          />
        ) : isPending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : filteredAgentsList?.length === 0 ? (
          <NoItemsMessage message={t("AgentsList.NoItemsMessage")} />
        ) : (
          filteredAgentsList?.map((item) => (
            <li
              key={item?.id}
              onClick={() => setSelectedChatId(item?.id)}
              className={`flex items-center group gap-3 trns cursor-pointer px-4 py-3 ${
                selectedChatId === item?.id ? "bg-gray-200" : ""
              } hover:bg-gray-200 rounded-2xl`}
            >
              <Avatar className="   w-14 min-w-[56px] h-14 min-h-[56px] xl:w-10 xl:min-w-[40px] xl:h-10 xl:min-h-[40px] p-1.5 xl:p-1">
                <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
                <AvatarImage
                  className="object-cover rounded-full"
                  src={item?.image}
                />
                <AvatarFallback>
                  {item?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                  {item?.name?.split(" ")?.[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 title={item?.name} className="text-lg font- line-clamp-1">
                  {item?.name}
                </h3>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AgentsList;
