import { useFetchData, useFetchPaginatedData } from "@/Hooks/useAxios";
import useWindowSize from "@/Hooks/useWindowSize";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { ProjectCard } from "@/components/CardsComponents";
import { Pagination } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { IProjectCardData, IPropertyCardData } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

// ! change the name of functional component from
// ! AgentProperties to AgentProjects
const AgentProjects = memo(function AgentProJects({
  t,
  // ! changed from agent to broker
  type = "broker",
  userProps,
}: {
  t: TFunction;
  type?: string;
  userProps?: IPropertyCardData[];
  // data?: IPropertyCardData[];
}) {
  let [searchParams] = useSearchParams();
  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);
  const { width } = useWindowSize();

  const [page, setPage] = useState(searchParams.get("page") || 1);
  const { agentID } = useParams();

  // ! STOP this code of useFetchPagination and receive the data from agent details
  // const api = `${import.meta.env.VITE_BROKER}${agentID}/${type}`;
  // const { isPending, isError, isPaused, data } = useFetchPaginatedData(
  //   "AgentProjects",
  //   page,
  //   // ? i have to remove the page bec. the api doesn't accept it
  //   // `${import.meta.env.VITE_BROKER}${agentID}/${type}/&page=${page}`,
  //   api,
  //   false,
  //   5000,
  //   0,
  //   // ! you have to send the type to add it with the api in the Axios
  //   type === "user" ? false : true
  // );

  // ! TRY another FX to get api which gonna be useFetcherData()
  const api = `${import.meta.env.VITE_BROKER}${agentID}/${type}`;

  const { isPending, isError, isPaused, data } = useFetchData(
    "AgentProjects",
    api,
    false,
    false,
    agentID
  );

  if (!data) {
    return <div></div>;
  }

  const finalData = type === "user" ? userProps : data[0]?.projects;
  console.log(`56:  Agent Projects Sent api ` + api);
  console.log("58: agent projects data " + JSON.stringify(data[0].projects));

  return (
    <>
      <div className="Agent__properties--wrapper w-full grid grid-cols-1 gap-[35px]  ">
        {(isError || isPaused) && type === "broker" ? (
          <ErrorMessage message={t("AgentProjects.ErrorMessage")} />
        ) : isPending && type === "broker" ? (
          <Loader className="h-40" />
        ) : finalData?.length === 0 ? (
          <NoItemsMessage message={t("AgentProjects.NoItemsMessage")} />
        ) : (
          finalData?.map((card: IProjectCardData) => (
            <ProjectCard
              key={card?.id}
              className={`${
                data?.data?.length < 3 ? "max-w-[410px]" : "w-full"
              }`}
              card={card}
              t={t}
            />
          ))
        )}
      </div>

      {type === "broker" && data?.meta?.last_page > 1 && (
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

export default AgentProjects;
