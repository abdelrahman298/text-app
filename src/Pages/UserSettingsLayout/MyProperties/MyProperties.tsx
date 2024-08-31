import {
  setDeletedItem,
  setToggleDeletePopUp,
} from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { Heading, HelmetTags, LangLink } from "@/components/MainComponents";
import {
  DeletePopUp,
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

type MyProperty = {
  id: number;
  title: string;
  primary_image: string;
  for_what: string;
  rent_price: number;
  sale_price: number;
  rent_duration: string;
  listing_number: string;
  approved: string;
  views: number;
  currency: number;
  created_at?: string;
  acceptance?: number;
};
export function Component() {
  const { t } = useTranslation("Pages_MyProperties");
  const [userProfileData, , isPending, isError, isPaused] = useOutletContext();

  const dispatchRedux = useAppDispatch();

  const queryClient = useQueryClient();

  function handleDeletePropertySuccess() {
    //queryClient.invalidateQueries("userProfileData");
    queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }

  // console.log(JSON.stringify(userProfileData.my_props));

  return (
    <section>
      <Heading className="text-center mb-5">{t("heading")}</Heading>

      <div className="bg-grey p-5 rounded-lg text-temp_secondary">
        <HelmetTags
          title={`${userProfileData?.first_name || ""} ${t("tab.title")}`}
          description={`${userProfileData?.name || ""} ${t("tab.description")}`}
          index={false}
        />
        <DeletePopUp
          api={import.meta.env.VITE_DELETE_PROPERTY}
          t={t}
          onSuccess={handleDeletePropertySuccess}
        />
        <div className=" w-full flex-center my-10">
          {isError || isPaused ? (
            <ErrorMessage message={t("ErrorMessage")} />
          ) : isPending ? (
            <Loader className="h-[310px]" />
          ) : userProfileData?.my_props?.length === 0 ? (
            <NoItemsMessage message={t("NoItemsMessage")} />
          ) : (
            <div className="overflow-x-auto w-full px-0.5">
              <table className="w-full border ">
                <thead className="text-lg">
                  <tr className="bg-slate-200 ">
                    <th className="w-[176px] min-w-[160px] max-w-[160px]  font-medium ">
                      {t("table.thead.img")}
                    </th>
                    <th className="w-80 min-w-[220px] max-w-[220px] font-medium ">
                      {t("table.thead.name")}
                    </th>
                    <th className="w-36 min-w-[120px] max-w-[120px] font-medium ">
                      {t("table.thead.time")}
                    </th>
                    <th className="w-32 min-w-[128px] max-w-[128px] font-medium ">
                      {t("table.thead.price")}
                    </th>
                    <th className="font-medium ">{t("table.thead.views")}</th>
                    <th className="font-medium ">{t("table.thead.link")}</th>
                    <th className="font-medium ">
                      {t("table.thead.approved")}
                    </th>
                    <th className="font-medium ">{t("table.thead.delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  {userProfileData?.my_props?.map((property: MyProperty) => (
                    <tr key={property?.id}>
                      <td className="font-medium ">
                        <img
                          loading="lazy"
                          className="object-cover rounded-sm aspect-[3/2] w-40 mx-auto"
                          src={property?.primary_image}
                          alt={property?.title}
                        />{" "}
                      </td>
                      <td title={property?.title} className=" h-auto ">
                        <span className="line-clamp-4  w-full">
                          {property?.title}
                        </span>
                      </td>
                      <td className=" text-sm ">{property?.created_at}</td>
                      <td>
                        {t("PropertyCard.price_formatted", {
                          context: property?.for_what,
                          sale_price: property?.sale_price,
                          rent_price: property?.rent_price,
                          curr: property?.currency,
                          duration: property?.rent_duration,
                        })}
                      </td>
                      <td>{property?.views}</td>
                      <td>
                        {" "}
                        {property?.acceptance == 1 && (
                          <LangLink
                            target="_blank"
                            to={`/properties/${
                              property?.listing_number
                            }/${property?.title?.replace(/\s/g, "-")}`}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </LangLink>
                        )}
                      </td>
                      <td
                        className={`${
                          property?.acceptance == 1
                            ? "text-green-600"
                            : "text-temp_secondary"
                        }`}
                      >
                        {property?.acceptance == 1
                          ? t("acceptance.accepted")
                          : t("acceptance.pending")}
                      </td>
                      <td>
                        {property?.acceptance == 1 && (
                          <button
                            onClick={() => {
                              dispatchRedux(setDeletedItem(property?.id));
                              dispatchRedux(setToggleDeletePopUp(true));
                            }}
                          >
                            <FontAwesomeIcon
                              className="text-delete"
                              icon={faTrash}
                            />{" "}
                          </button>
                        )}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
