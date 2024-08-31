import { useFetchPaginatedData } from "@/Hooks/useAxios";
import useWindowSize from "@/Hooks/useWindowSize";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { PropertyCard } from "@/components/CardsComponents";
import { Pagination } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { IPropertyCardData } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { memo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const AgentPropertiesForRent = memo(function AgentPropertiesForRent({
  t,
  type = "broker",
  userProps,
}: {
  t: TFunction;
  type?: string;
  userProps?: IPropertyCardData[];
}) {
  let [searchParams] = useSearchParams();
  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);
  const { width } = useWindowSize();

  const [page, setPage] = useState(searchParams.get("page") || 1);
  const { agentID } = useParams();
  const { isPending, isError, isPaused, data } = useFetchPaginatedData(
    "AgentPropertiesForRent",
    page,
    // ? i have to remove the page bec. the api don't accept it
    // `${import.meta.env.VITE_SINGLE_AGENT_PROPERTIES}${agentID}&page=${page}`,
    `${import.meta.env.VITE_SINGLE_AGENT_PROPERTIES}${agentID}`,

    false,
    5000,
    0,
    type === "user" ? false : true
  );
  // ! have changed it to user and got nothing

  const finalData = type === "agent" ? userProps : data?.for_rent.content;
  // console.log(
  //   "From agent properties " + JSON.stringify(data?.for_rent.content)
  // );
  // console.log("From agent properties " + userProps);
  console.log("From AgentProperties() final data" + JSON.stringify(finalData));

  return (
    <>
      <div className="Agent__properties--wrapper w-full grid grid-cols-1 gap-[35px]  ">
        {(isError || isPaused) && type === "agent" ? (
          <ErrorMessage message={t("AgentPropertiesForRent.ErrorMessage")} />
        ) : isPending && type === "agent" ? (
          <Loader className="h-40" />
        ) : finalData?.length === 0 ? (
          <NoItemsMessage
            message={t("AgentPropertiesForRent.NoItemsMessage")}
          />
        ) : (
          finalData?.data.map((card: IPropertyCardData) => (
            <PropertyCard
              key={card?.id}
              card={card}
              t={t}
              user={user}
              alignment={width > 700 ? "horizontal" : "vertical"}
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
            />
          ))
        )}
      </div>
      {type === "agent" && data?.meta?.last_page > 1 && (
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

export default AgentPropertiesForRent;
