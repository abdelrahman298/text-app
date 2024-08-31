import { useFetchData } from "@/Hooks/useAxios";
import { HelmetTags } from "@/components/MainComponents";
import i18n from "@/i18n";
import { t } from "i18next";

function test() {
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_HomePage",
    `${import.meta.env.VITE_GET_SEO_DATA}/HomePage`
  );

  // , i18n

  // return (
  //   <div>
  //     <HelmetTags
  //       title={t("tab.title")}
  //       description={SEO_DATA?.description || ""}
  //       keywords={SEO_DATA?.keywords || ""}
  //       canonical={`${i18n.language}/search`}
  //     />
  //     <HelmetTags
  //       title={data?.title + t("tab.title")}
  //       description={SEO_DATA?.description || ""}
  //       keywords={SEO_DATA?.keywords || ""}
  //       canonical={`${i18n.language}/properties/${
  //         data?.listing_number
  //       }/${data?.title?.replace(/\s/g, "-")}`}
  //     />
  //     <div>ddas</div>
  //   </div>
  // );
}

export default test;
