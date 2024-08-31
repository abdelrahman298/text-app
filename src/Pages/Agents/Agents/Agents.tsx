import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import { AgentCard } from "@/components/CardsComponents";
import { Heading, HelmetTags } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { IAgentCardData } from "@/types/CardsTypes";

import { useTranslation } from "react-i18next";
import { defaultData } from "../../../Utilities/style.js";

export function Component() {
  const { t, i18n } = useTranslation("Pages_Agents");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_Agents",
    `${import.meta.env.VITE_GET_SEO_DATA}/Agents`
  );

  const { isPending, isError, isPaused, data } = useFetchData(
    "AllAgents",
    import.meta.env.VITE_AGENTS,
    false,
    false,
    "",
    5000

    // 0,
    // true,
    // true
    // "",
    // "",
    // true
  );

  const { data: externalData } = useExternalData();

  return (
    <section className="site_container pt-20  pb-32">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/agents`}
      />

      <Heading color={defaultData.color} className={"text-center"}>
        {t("heading")}
      </Heading>
      <div className="all__Agents--wrapper w-full grid-auto-fit my-10">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          <Loader className="h-40" />
        ) : data?.card?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          data?.original?.data?.map((card: IAgentCardData) => (
            <AgentCard
              color={defaultData.color}
              showAllDetails
              key={card?.id}
              className={`${
                data?.original?.data?.length < 3
                  ? "max-w-[410px] w-full"
                  : "w-full"
              }`}
              card={card}
              t={t}
            />
          ))
        )}
      </div>
    </section>
  );
}
