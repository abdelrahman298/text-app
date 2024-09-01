import { Heading, HelmetTags, LangLink } from "@/components/MainComponents";
import {
	ErrorMessage,
	Loader,
	NoItemsMessage,
} from "@/components/SubComponents";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

type MyOffer = {
	id: number;
	property_title: string;
	listing_number: string;
	cost: number;
	offer: number;
	currency: string;
	accepted: number;
	time?: string;
	for_what?: any;
	sale_price?: any;
	rent_price?: any;
	rent_duration?: any;
	status?: any;
};
export function Component() {
	const { t } = useTranslation("Pages_MyOffers");
	const [userProfileData, , isPending, isError, isPaused] =
		useOutletContext<any>();
	console.log(JSON.stringify(userProfileData.offers));

	return (
		<section>
			<Heading className="text-center mb-5">{t("heading")}</Heading>

			<div className="bg-grey p-5 rounded-lg text-temp_secondary">
				<HelmetTags
					title={`${userProfileData?.name || ""} ${t("tab.title")}`}
					description={`${userProfileData?.name || ""} ${t("tab.description")}`}
					index={false}
				/>
				<div className=" w-full flex-center my-10">
					{isError || isPaused ? (
						<ErrorMessage message={t("ErrorMessage")} />
					) : isPending ? (
						<Loader className="h-[310px]" />
					) : userProfileData?.offers?.length === 0 ? (
						<NoItemsMessage message={t("NoItemsMessage")} />
					) : (
						<div className="overflow-x-auto w-full px-0.5">
							<table className="w-full border ">
								<thead className=" text-lg">
									<tr className="bg-slate-200">
										<th className="w-80 min-w-[220px] font-medium ">
											{t("table.thead.name")}
										</th>
										<th className="w-36 min-w-[120px] font-medium ">
											{t("table.thead.time")}
										</th>
										<th className="font-medium ">{t("table.thead.link")}</th>
										<th className="font-medium ">{t("table.thead.cost")}</th>
										<th className="font-medium w-24 min-w-[90px]">
											{t("table.thead.my_offer")}
										</th>
										<th className="font-medium ">{t("table.thead.status")}</th>
									</tr>
								</thead>
								<tbody>
									{userProfileData?.offers?.map((offer: MyOffer) => (
										<tr key={offer?.id}>
											<td title={offer?.property_title}>
												<span className="line-clamp-4  w-full">
													{offer?.property_title}
												</span>
											</td>
											<td className=" text-sm ">{offer?.time}</td>
											<td>
												<LangLink
													target="_blank"
													to={`/properties/${
														offer?.listing_number
													}/${offer?.property_title?.replace(/\s/g, "-")}`}
												>
													<FontAwesomeIcon icon={faEye} />
												</LangLink>
											</td>
											<td className=" font-medium ">
												{t("cost.price_formatted", {
													context: offer?.for_what,
													sale_price: offer?.sale_price,
													rent_price: offer?.rent_price,
													curr: offer?.currency,
													duration: offer?.rent_duration,
												})}
											</td>
											<td className=" font-medium ">
												{t?.("table.thead.offer_formatted", {
													offer: offer?.offer,
													curr: offer?.currency,
												})}
											</td>
											<td>
												{offer?.status == 1
													? t("status.seen")
													: t("status.not_seen")}
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
