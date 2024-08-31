import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import {
  HeadingUnderline,
  HelmetTags,
  SendMessageForm,
} from "@/components/MainComponents";
import { ErrorMessage, Loader } from "@/components/SubComponents";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { defaultData } from "../../../src/Utilities/style.js";

export function Component() {
  const { data: externalData } = useExternalData();

  const { t, i18n } = useTranslation("Pages_ContactUs");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_ContactUs",
    `${import.meta.env.VITE_GET_SEO_DATA}/ContactUs`
  );

  const { data, isPending, isError, isPaused } = useFetchData(
    "ContactUs",
    import.meta.env.VITE_CONTACT_US_GET,
    false,
    true,
    "",
    5000,
    0,
    true,
    true
  );

  if (isError || isPaused) {
    return <ErrorMessage message={t("ErrorMessage")} />;
  }
  if (isPending) {
    return <Loader className="h-[calc(100vh-135px)] mb-32" />;
  }

  return (
    <section className="">
      <section className=" site_container  bg- flex justify-between items-start pt-20 gap-0 lg:gap-20 pb-16  lg:flex-col lg:items-center lg:justify-start text-temp_secondary">
        <HelmetTags
          title={t("tab.title")}
          description={SEO_DATA?.description || ""}
          keywords={SEO_DATA?.keywords || ""}
          canonical={`${i18n.language}/contact-us`}
        />
        <section className="Property__Details--content min-h- w-[66%] flex flex-col gap-16 bg- lg:w-full">
          <div className=" bg-grey p-6 rounded-lg">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {t("heading")}
            </HeadingUnderline>

            <SendMessageForm
              params={{}}
              api={import.meta.env.VITE_CONTACT_US_POST}
              type="CONTACT_US"
              t={t}
              Bgcolor="dark"
            />
          </div>
        </section>
        <aside className=" Property__Details--aside w-[31%] lg:w-full md:w-full h-fit flex flex-col lg:items-center gap-16 ">
          <div className="bg-grey p-6 rounded-lg  w-full flex flex-col gap-7 lg:flex-row lg:justify-between ss:flex-col sm:items-">
            <div className="flex flex-col gap-5">
              <h1>
                <HeadingUnderline
                  textcolor={defaultData.color}
                  className="text-2xl mb-3"
                >
                  {t("aside.title")}
                </HeadingUnderline>
              </h1>
              <div style={{ color: defaultData.color }}>
                <h3 className="font- text-xl">{t("aside.Address")}</h3>
                <h4 className="opacity-80">{data?.address}</h4>
              </div>
              <div style={{ color: defaultData.color }}>
                <h3 className="font- text-xl">{t("aside.Phone")}</h3>
                <h4 className="opacity-80">{data?.phone}</h4>
              </div>
              <div style={{ color: defaultData.color }}>
                <h3 className="font- text-xl">{t("aside.Email")}</h3>
                <h4 className="opacity-80">{data?.mail}</h4>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <HeadingUnderline
                textcolor={defaultData.color}
                className="text-2xl mb-3"
              >
                {t("aside.Follow_Us")}
              </HeadingUnderline>
              <div className="Property__share--options flex gap-4 ">
                <a
                  href={data?.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary`}
                >
                  <FontAwesomeIcon className=" text-2xl" icon={faFacebook} />
                </a>
                <a
                  href={data?.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary`}
                >
                  <FontAwesomeIcon className=" text-2xl" icon={faXTwitter} />
                </a>
                <a
                  href={data?.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary`}
                >
                  <FontAwesomeIcon className=" text-2xl" icon={faInstagram} />
                </a>
                <a
                  href={data?.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary`}
                >
                  <FontAwesomeIcon className=" text-2xl" icon={faLinkedinIn} />
                </a>
                <a
                  href={data?.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary`}
                >
                  <FontAwesomeIcon className=" text-2xl" icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>
      <div
        className="iframe__fixed--height w-full border-2 border-temp_secondary rounded-md  mt-7 mb-48"
        dangerouslySetInnerHTML={{
          __html: data?.location,
        }}
      ></div>
    </section>
  );
}
