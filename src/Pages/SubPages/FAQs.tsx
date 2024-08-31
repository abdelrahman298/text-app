import { useFetchData } from "@/Hooks/useAxios";
import {
  CitiesAside,
  FeaturedPropertiesAside,
  PropertiesCategories,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import {
  Heading,
  HelmetTags,
  SideBarSearchForm,
  SubHeading,
} from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export function Component() {
  const { t, i18n } = useTranslation("Pages_FAQs");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_FAQs",
    `${import.meta.env.VITE_GET_SEO_DATA}/FAQs`
  );
  const {
    data: FAQsData,
    isPending,
    isError,
    isPaused,
  } = useFetchData("FAQs", import.meta.env.VITE_FAQS);

  if (isError || isPaused) {
    return (
      <div className="h-[calc(100vh-136px)] w-full flex justify-center items-center">
        <ErrorMessage message={t("ErrorMessage")} />{" "}
      </div>
    );
  }
  if (isPending) {
    return <Loader className="h-[calc(100vh-135px)] mb-32" />;
  }
  if (FAQsData?.length === 0) {
    return (
      <div className="h-[calc(100vh-96px)] w-full flex justify-center items-center">
        <NoItemsMessage message={t("NoItemsMessage")} />
      </div>
    );
  }
  return (
    <section className="pt-20 pb-44 site_container ">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/faqs`}
      />
      <Heading className={"text-center"}>{t("heading")}</Heading>
      <SubHeading>{t("sub_heading")}</SubHeading>

      <section className=" site_container   flex justify-between items-start pt-20 gap-0 lg:gap-20 pb-32 lg:pb-24 lg:flex-col lg:items-center lg:justify-start">
        <section className="faqs__main--section min-h- w-[66%] bg- lg:w-full text-temp_secondary">
          <Accordion
            type="multiple"
            className="w-full mt-7 flex flex-col gap-5"
            defaultValue={["item-1"]}
          >
            {FAQsData?.map((item) => (
              <AccordionItem
                key={item?.id}
                id={item?.id}
                value={`item-${item?.id}`}
                className="border border-temp_secondary rounded-sm"
              >
                <AccordionHeader asChild>
                  <AccordionTrigger className="!border-none" bg>
                    <h2
                      dangerouslySetInnerHTML={{ __html: item.question }}
                      className="flex items-center gap-2"
                    ></h2>
                  </AccordionTrigger>
                </AccordionHeader>

                <AccordionContent>
                  <div
                    className="text-base text-justify"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <aside className=" faqs__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
          <SideBarSearchForm />
          <PropertiesCategories t={t} />
          <FeaturedPropertiesAside t={t} />
          <RecentlyViewedProperties t={t} />
          <CitiesAside t={t} />
        </aside>
      </section>
    </section>
  );
}
