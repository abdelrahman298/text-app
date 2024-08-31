import { useFetchData, useFetchPaginatedData } from "@/Hooks/useAxios";
import { HeadingUnderline, LangLink } from "../MainComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { TFunction } from "i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

interface project {
  id: number;
  title: string;
  listing_number: number|string;
}

function AllProjectsAside({ t }: { t: TFunction }) {
      const { projectNumber } = useParams();

 /*  const { data } = useFetchData(
    "AllProjectsAside",
    import.meta.env.VITE_PROPERTIES_CATEGORIES
  ); */

   let [searchParams] = useSearchParams();
   const [page, setPage] = useState(searchParams.get("page") || 1);
  const { isPending, isError, isPaused, data } = useFetchPaginatedData(
    "Projects",
    page,
    `${import.meta.env.VITE_PROJECTS}?limit=${
      import.meta.env.VITE_PAGINATION_LIMIT
    }&page=${page}`
  );

if (data?.data?.length === 0) {
    return
}

  return (
    <section className="w-full p-6 bg-grey rounded-lg">
      <HeadingUnderline className="mb-9">
        {t("AllProjectsAside.title")}{" "}
      </HeadingUnderline>

      <ul className="w-full flex flex-col items-start gap-5  ">
        {data?.data?.map((project: project) => (
          <li className="w-full text-xl  " key={project?.id}>
            <LangLink
              className={`w-full flex items-center px-4 h-14  trns hover:bg-temp_secondary hover:text-background text-temp_secondary bg-transparent border border-temp_secondary rounded-sm ${
                project?.listing_number == projectNumber
                  ? "!bg-temp_secondary !text-background"
                  : ""
              }`}
              to={`/projects/${
                project?.listing_number
              }/${project?.title?.replace(/\s/g, "-")}`}
            >
              {project?.title}{" "}
              
            </LangLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AllProjectsAside;
