import { cn } from "@/lib/utils";
import {
  faCircleExclamation,
  faComments,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "@/Hooks/useAxios";
import { ErrorMessage } from "@/components/SubComponents";
import { LangLink } from "@/components/MainComponents";

type ChatAreaProps = {
  selectedChatId: string | number;
  t: TFunction;
  userData?: { name: string; phone: string; email: string };
  className?: string;
};

type ChatData = {
  id: string;
  name: string;
  image: string;
  messages: any;
};

function ChatArea({ className, selectedChatId, t, userData }: ChatAreaProps) {
  const [chatData, setChatData] = useState<ChatData>();
  const textInput = useRef<HTMLInputElement>(null);

  const [isTyping, setIsTyping] = useState(false);

  function handleTyping(e: React.KeyboardEvent<HTMLInputElement>) {
    const Target = e.target as HTMLInputElement;
    if (Target.value !== "") {
      setIsTyping(true);
      if (e.key === "Enter") {
        sendMessage();
      }
    } else {
      setIsTyping(false);
    }
  }

  const {
    mutate: getSelectedAgentChat,
    isPending: getSelectedAgentChatIsPending,
    isError: getSelectedAgentChatIsError,
    isPaused: getSelectedAgentChatIsPaused,
  } = usePostData(
    false,
    (data) => {
      setChatData(data?.data?.agent_data);
    },
    true,
    () => {}
  );

  useEffect(() => {
    if (selectedChatId) {
      getSelectedAgentChat({
        api: import.meta.env.VITE_USER_MESSAGES_WITH_AGENT,
        data: {
          agent_id: selectedChatId,
        },
      });
    }
  }, [getSelectedAgentChat, selectedChatId]);

  const {
    mutate: SEND_MESSAGE_TO_AGENT,
    isPending,
    isError,
    isPaused,
  } = usePostData(
    true,
    () => {
      setIsTyping(false);
      if (textInput.current) {
        textInput.current.value = "";
        textInput?.current?.focus();
      }
      //TODO: refetch the chat data
      getSelectedAgentChat({
        api: import.meta.env.VITE_USER_MESSAGES_WITH_AGENT,
        data: {
          agent_id: selectedChatId,
        },
      });
    },
    true
  );
  function sendMessage() {
    if (textInput.current && textInput?.current?.value !== "") {
      SEND_MESSAGE_TO_AGENT({
        api: import.meta.env.VITE_SEND_MESSAGE_TO_AGENT,
        data: {
          name: userData?.name,
          phone: userData?.phone,
          email: userData?.email,
          not_ropot: "yes",
          from: "Web",
          vendor_id: chatData?.id,
          message: textInput?.current?.value,
        },
      });
    } else toast.error(t("ChatArea.toast_err_no_msg_to_send"));
  }

  return (
    <div
      className={cn(
        "w-full rounded-lg overflow-hidden h-full md:h-[500px] bg-grey text-temp_secondary ",
        className
      )}
    >
      {selectedChatId ? (
        <div className="chat__wrapper w-full h-full relative flex flex-col justify-between">
          <LangLink
            to={`/agents/${chatData?.id}/${chatData?.name?.replace(
              /\s/g,
              "-"
            )}`}
            className="chat__area--top--name bg-gray-300  w-full h-28 flex gap-5 p-4 items-center sticky top-0 shadow-sm"
          >
            <Avatar className="   w-20 min-w-[80px] h-20 min-h-[80px] ">
              <AvatarImage
                className="object-cover rounded-full"
                src={chatData?.image}
              />
              <AvatarFallback>
                {chatData?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                {chatData?.name?.split(" ")?.[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-xl">{chatData?.name}</h3>
          </LangLink>
          <ul
            className={`chat__area--mid--messages flex flex-col gap-7 overflow-y-auto p-7 h-[calc(100%-112px-80px)] ${
              (getSelectedAgentChatIsError ||
                getSelectedAgentChatIsPaused ||
                getSelectedAgentChatIsPending) &&
              "items-center justify-center"
            }`}
          >
            {getSelectedAgentChatIsError || getSelectedAgentChatIsPaused ? (
              <ErrorMessage
                className="text-center px-1 text-red-500"
                message={t("ChatArea.ErrorMessage")}
              />
            ) : getSelectedAgentChatIsPending ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              chatData?.messages?.map((msg, i) => {
                return (
                  <div key={msg?.id}>
                    <li
                      className={`msg__text--time  flex-col  items-end ${
                        msg?.message ? "flex" : "hidden"
                      }`}
                    >
                      <h6 className="text-xs mb-1.5">{msg?.message_time}</h6>
                      <p className="p-1.5 text-sm bg-cyan-100 rounded-md w-fit max-w-[75%]">
                        {msg?.message}
                      </p>
                    </li>
                    <li
                      className={` items-end gap-3 ${
                        msg?.reply ? "flex" : "hidden"
                      } `}
                    >
                      <Avatar className="   w-9 min-w-[36px] h-9 min-h-[36px] ">
                        <AvatarImage
                          className="object-cover rounded-full"
                          src={chatData?.image}
                        />
                        <AvatarFallback>
                          {chatData?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                          {chatData?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="msg__text--time">
                        <h6 className="text-xs mb-1.5">{msg?.reply_time}</h6>
                        <p className="p-1.5 text-sm bg-slate-200 rounded-md w-fit max-w-[75%]">
                          {msg?.reply}
                        </p>
                      </div>
                    </li>
                    <div className="spinner__error--icon--placement flex flex-col items-end">
                      {i === chatData?.messages?.length - 1 && isPending && (
                        <FontAwesomeIcon
                          className=" mt-1"
                          icon={faSpinner}
                          spin
                        />
                      )}
                      {i === chatData?.messages?.length - 1 &&
                        (isError || isPaused) && (
                          <FontAwesomeIcon
                            className="text-red-500 mt-1"
                            title="failed to send the message"
                            icon={faCircleExclamation}
                          />
                        )}
                    </div>
                  </div>
                );
              })
            )}
          </ul>
          <div className="chat__area--bottom--input w-full p-4 h-20 bg-gray-300 flex items-center gap-3">
            <input
              onKeyUp={handleTyping}
              ref={textInput}
              autoFocus
              className="w-full dark-bg-inputs "
              type="text"
              name="msg"
              id="msg"
              autoComplete="off"
              placeholder={t("ChatArea.type_msg")}
            />
            <button
              onClick={sendMessage}
              disabled={!isTyping}
              className={`text-xl ${
                isTyping
                  ? "cursor-pointer opacity-100 translate-x-1 -translate-y-1 rtl:-translate-x-1"
                  : "cursor-no-drop opacity-70"
              }  trns active:scale-90 disabled:active:scale-100`}
            >
              <FontAwesomeIcon className="rtl:flip" icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ) : (
        <div className="no__chat--selected flex-col-center w-full h-full gap-5">
          <h5>{t("ChatArea.no_chat_selected_txt")}</h5>
          <FontAwesomeIcon className="text-7xl" icon={faComments} />
        </div>
      )}
    </div>
  );
}

export default ChatArea;
