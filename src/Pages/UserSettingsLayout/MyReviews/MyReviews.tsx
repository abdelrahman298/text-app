import { Heading, HelmetTags, LangLink } from "@/components/MainComponents";
import {
	ErrorMessage,
	Loader,
	NoItemsMessage,
} from "@/components/SubComponents";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export function Component() {
	const { t } = useTranslation("Pages_Reviews");
	const [userProfileData, isPending, isError, isPaused] =
		useOutletContext<any>();

	return (
		<section>
			<Heading className="text-center mb-5">{t("heading")}</Heading>

			<div className="bg-grey p-5 rounded-lg text-temp_secondary min-h-[500px]">
				<HelmetTags
					title={`${userProfileData?.name || ""}  ${t("tab.title")}`}
					description={`${userProfileData?.name || ""} ${t("tab.description")}`}
					index={false}
				/>
				<ul className="reviews__wrapper flex flex-col gap-10">
					{isError || isPaused ? (
						<ErrorMessage message={t("ErrorMessage")} />
					) : isPending ? (
						<Loader className="h-[390px]" />
					) : userProfileData?.comments?.length === 0 ? (
						<NoItemsMessage
							className="h-[390px]"
							message={t("NoItemsMessage")}
						/>
					) : (
						userProfileData?.comments?.map((review) => (
							<li
								key={review?.id}
								className="flex ss:flex-col gap-7 items-start"
							>
								<LangLink
									to={`/properties/${review?.listing_number}`}
									className="review__prop--img w-1/4 xl:w-1/3 ss:w-full"
								>
									<img
										className="rounded-sm w-full aspect-[3/2] object-cover"
										src={review?.primary_image}
										alt="review prop img"
									/>
								</LangLink>
								<div className="review__details p-5 rounded-md w-3/4  xl:w-2/3 ss:w-full bg-gray-200 relative">
									<div className="review__absolute--clip--path absolute bg-gray-200 rounded-md w-6 h-10 left-1 rtl:left-auto rtl:right-1 rtl:translate-x-full rtl:rotate-180 -translate-x-full top-5 ss:top-3 ss:rotate-90 ss:translate-x-1/2 ss:right-1/2 ss:left-auto ss:-translate-y-full "></div>
									<div className="review__details--rate--date flex justify-between items-center mb-5">
										<span className="bg-accnt text-background px-2  rounded-sm text-lg shadow-sm rtl:ltr">
											<span className="text-xl font-bold">{review?.stars}</span>{" "}
											/ 5
										</span>
										<span
											className={`${
												review?.status == 0
													? "text-temp_secondary"
													: review?.status == 1
													? "text-green-600"
													: "text-red-500"
											}`}
										>
											{review?.status == 0
												? t("status.pending")
												: review?.status == 1
												? t("status.accepted")
												: t("status.rejected")}
										</span>
										<span className="text-sm opacity-80">{review?.time}</span>
									</div>
									<p className="review__details--review italic text-justify text-">
										{review?.message}
									</p>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
		</section>
	);
}
