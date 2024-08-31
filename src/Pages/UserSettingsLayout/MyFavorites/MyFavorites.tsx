import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { lang } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { PropertyCard } from "@/components/CardsComponents";
import { Heading, HelmetTags } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { IPropertyCardData } from "@/types/CardsTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export function Component() {
  const { t } = useTranslation("Pages_Favorites");

  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);
  const lng = useAppSelector(lang);

  const queryClient = useQueryClient();
  const [userProfileData, , isPending, isError, isPaused] =
    useOutletContext<any>();

  function handleAfterRemoveFromWishlist(id: number) {
    //queryClient.invalidateQueries("userProfileData");

    queryClient.resetQueries({ queryKey: ["userProfileData"] });
  }
  return (
    <section className="w-full">
      <Heading className="text-center mb-5">{t("heading")}</Heading>

      <div className="bg-grey p-5 rounded-lg text-temp_secondary w-full">
        <HelmetTags
          title={`${userProfileData?.name || ""} ${t("tab.title")}`}
          description={`${userProfileData?.name || ""} ${t("tab.description")}`}
          index={false}
        />

        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          <Loader className="h-[390px]" />
        ) : userProfileData?.favorite_list?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          <div
            className={`all__properties--wrapper w-full grid ${
              userProfileData?.favorite_list?.length < 2
                ? "grid-cols-1 justify-items-center"
                : "grid-cols-2"
            }  md:grid-cols-1 gap-[35px] my-5`}
          >
            {userProfileData?.favorite_list?.map((card: IPropertyCardData) => (
              <PropertyCard
                className={`${
                  userProfileData?.favorite_list?.length < 3
                    ? "max-w-[410px]"
                    : "w-full"
                }`}
                onSuccess={handleAfterRemoveFromWishlist}
                key={card?.id}
                card={card}
                user={user}
                lng={lng}
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                t={t}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
