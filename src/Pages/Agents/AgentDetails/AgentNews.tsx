import { useFetchPaginatedData } from "@/Hooks/useAxios";
import useWindowSize from "@/Hooks/useWindowSize";

import { NewsCard } from "@/components/CardsComponents";
import { Pagination } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { INewsCardData } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { memo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const AgentNews = memo(function AgentNews({ t }: { t: TFunction }) {
  let [searchParams] = useSearchParams();

  const { width } = useWindowSize();

  const [page, setPage] = useState(searchParams.get("page") || 1);
  const { agentID } = useParams();

  const { isPending, isError, isPaused, data } = useFetchPaginatedData(
    "AgentNews",
    page,
    `${import.meta.env.VITE_SINGLE_AGENT_NEWS}${agentID}?limit=${
      import.meta.env.VITE_PAGINATION_LIMIT
    }&page=${page}`
  );
  console.log(data, "prop");

  return (
    <>
      <div className="Agent__properties--wrapper w-full grid grid-cols-1 gap-[35px]  ">
        {isError || isPaused ? (
          <ErrorMessage message={t("AgentNews.ErrorMessage")} />
        ) : isPending ? (
          <Loader className="h-40" />
        ) : data?.data?.length === 0 ? (
          <NoItemsMessage message={t("AgentNews.NoItemsMessage")} />
        ) : (
          data?.data?.map((card: INewsCardData) => (
            <NewsCard
              key={card?.id}
              card={card}
              t={t}
              alignment={width > 700 ? "horizontal" : "vertical"}
            />
          ))
        )}
      </div>
      {data?.meta?.last_page > 1 && (
        <Pagination
          page={page}
          t={t}
          setPage={setPage}
          lastPage={data?.meta?.last_page}
        />
      )}
    </>
  );
});

export default AgentNews;
