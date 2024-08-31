import { useTranslation } from "react-i18next";
import AgentsList from "./AgentsList";
import ChatArea from "./ChatArea";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Heading, HelmetTags } from "@/components/MainComponents";

export function Component() {
  const { t } = useTranslation("Pages_messages");
  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const [selectedChatId, setSelectedChatId] = useState<number | string>("");
  return (
    <section>
      <Heading className="text-center mb-5">{t("heading")}</Heading>

      <div className="flex md:flex-col gap-10 h-[540px] md:h-auto ">
        <HelmetTags
          title={`${userProfileData?.name || ""} ${t("tab.title")}`}
          description={`${userProfileData?.name || ""} ${t("tab.description")}`}
          index={false}
        />
        <AgentsList
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          t={t}
          className="w-1/3 5xl:w-[43%]  md:w-full"
        />
        <ChatArea
          userData={{
            name: userProfileData?.name,
            phone: userProfileData?.phone,
            email: userProfileData?.email,
          }}
          t={t}
          selectedChatId={selectedChatId}
          className="w-2/3 5xl:w-[57%] md:w-full"
        />
      </div>
    </section>
  );
}
