import { useExternalData } from "@/Hooks/useAxios";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronRight,
  faEnvelope,
  faEnvelopeSquare,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultData } from "../../../Utilities/style.js";

function AgentInfo({ data, t }) {
  const { data: externalData } = useExternalData();

  return (
    <div className="agent__info flex justify-between items-start gap-16 md:flex-col md:items-center md:justify-start w-full bg-grey rounded-lg p-5">
      <div className="w-2/5 md:w-full h-auto  max-h-80 md:max-h-96 flex justify-center relative">
        {/* <span className="property__type absolute text-x rounded-md top-3 left-3 rtl:left-auto rtl:right-3 rtl:rtl px-2 py-1 bg-temp_secondary text-background  z-30">
          {t?.("AgentInfoComponent.count_formatted", {
            count: data?.properties_count,
          })}
        </span> */}

        <img
          className="agent__img object-cover w-full h-full max-h-80 md:max-h-96  max-w-full rounded-md"
          loading="lazy"
          src={data?.img}
          alt={data?.name}
        />
      </div>
      <div className="agent__details w-3/5 md:w-full">
        <h1
          style={{ color: defaultData.color.basic_color }}
          className="text-2xl font-medium ss:text-center"
        >
          {data?.name}
        </h1>
        {data?.count > 0 && (
          <h4
            style={{ color: defaultData.color.basic_color }}
            className="opacity-70 ss:text-center"
          >
            {t("AgentInfoComponent.count_formatted", {
              count: data?.count_formatted,
            })}
          </h4>
        )}
        {data?.projects_count > 0 && (
          <h4
            style={{ color: defaultData.color.basic_color }}
            className="opacity-70 ss:text-center"
          >
            {t("AgentInfoComponent.count_formatted", {
              count: data?.projects_count,
              context: "projects",
            })}
          </h4>
        )}

        <div
          style={{ color: defaultData.color }}
          className="agent__contacts w-full flex flex-row gap-3 my-7"
        >
          {/* //! Old Design of Agent Info Details  */}

          {/* {data?.phone && (
            <a
              rel="noreferrer"
              href={`tel:${data?.phone}`}
              className="flex justify-start items-center gap-3"
            >
              <span className="font-medium">
                {t("AgentInfoComponent.Phone")}
              </span>
              <span className="text-  opacity-70">{data?.phone}</span>
            </a>
          )} */}

          {/* {data?.email && (
            <a
              rel="noreferrer"
              href={`mailto:${data?.email}`}
              className="flex justify-start items-center gap-3"
            >
              <span className="font-medium">
                {t("AgentInfoComponent.Email")}
              </span>
              <span className="text-  opacity-70">{data?.email}</span>
            </a>
          )} */}

          {/* //! NEW Design of Agent Info Details */}

          <a
            rel="noreferrer"
            // prevent the href
            href={`https://wa.me/+2${data?.phone}?text=${encodeURIComponent(
              `hello `
            )}`}
            target="_blank"
            className="flex justify-start items-center gap-3 bg-green-500
               text-white p-3 display-block rounded-lg w-fit
               hover:bg-white transition duration-500
                 hover:text-green-500 border-2 border-green-500  hover:cursor-pointer"
          >
            <span className="font-medium   ">
              {/* {t("AgentInfoComponent.Phone")} */}
              Whatsapp
              <FontAwesomeIcon className="ml-2 fa-solid" icon={faWhatsapp} />
            </span>
          </a>

          <a
            rel="noreferrer"
            // prevent the href
            href={`tel:+2${data?.phone}`}
            className="flex justify-start items-center gap-3 bg-altern_color
               text-white p-3 display-block rounded-lg w-fit
               hover:bg-white transition duration-500
                hover:text-altern_color border-2 border-altern_color  hover:cursor-pointer"
          >
            <span className="font-medium ">
              {/* {t("AgentInfoComponent.Phone")} */}
              Call
              <FontAwesomeIcon
                className="ml-2 fa-solid fa-phone"
                icon={faPhone}
              />
            </span>
          </a>

          {data?.email && (
            <a
              rel="noreferrer"
              href={`mailto:${data?.email}?subject=Hello&body=Hello sure'`}
              className="flex justify-start items-center gap-3 bg-cyan-700
              text-white p-3 display-block rounded-lg w-fit
              hover:bg-white transition duration-500
             hover:text-cyan-700 border-2 border-cyan-700  hover:cursor-pointer"
            >
              <span className="font-medium">
                {/* {t("AgentInfoComponent.Email")} */}
                Email
                <FontAwesomeIcon className="ml-2 fa-solid" icon={faEnvelope} />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentInfo;
