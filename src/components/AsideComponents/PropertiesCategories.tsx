import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import { HeadingUnderline, LangLink } from "../MainComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { TFunction } from "i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { defaultData } from "../../../src/Utilities/style.js";

interface category {
  id: number;
  title: string;
  content_count: number;
}

type props = {
  t: TFunction;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  color?: string;
};

function PropertiesCategories({ t, setCategory, color }: props) {
  const { data: externalData } = useExternalData();

  const { data } = useFetchData(
    "PropertiesCategories",
    import.meta.env.VITE_PROPERTIES_CATEGORIES
  );
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("ci"));

  useEffect(() => {
    if (searchParams.get("ci") && searchParams.get("ci") !== "-1") {
      setCategory(
        data?.find((item) => item.id == searchParams.get("ci"))?.title
      );
    }
  }, [data, setCategory, searchParams]);
  return (
    <section className="w-full p-6 bg-grey rounded-lg">
      <HeadingUnderline textcolor={defaultData.color} className="mb-9">
        {t("PropertiesCategories.title")}
      </HeadingUnderline>

      <ul className="w-full flex flex-col items-start gap-3  ">
        {data?.map((category: category) => (
          <li
            onClick={() => searchParams.set("ci", String(category?.id))}
            className="w-full text-lg trns   hover:translate-x-2 rtl:hover:-translate-x-2 hover:scale-105"
            key={category?.id}
          >
            <LangLink
              className="w-full text-temp_secondary flex justify-between items-center gap-1 "
              to={`/search?ci=${category?.id}`}
            >
              <span className="flex-center gap-1.5 ">
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className="rtl:rotate-180"
                  color={defaultData.color}
                />
                <span style={{ color: defaultData.color }}>
                  {category?.title}
                </span>
              </span>{" "}
              {""}
              <span
                style={{ color: defaultData.color }}
                className="text-base min-w-fit "
              >
                {t("PropertiesCategories.count_formatted", {
                  count: category?.content_count,
                })}
              </span>
            </LangLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PropertiesCategories;
