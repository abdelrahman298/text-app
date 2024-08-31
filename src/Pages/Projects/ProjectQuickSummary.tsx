import { cn } from "@/lib/utils";
import { memo } from "react";

type QuickSummary = {
  data: any;
  t: any;
  className: any;
};

const ProjectQuickSummary = memo(function QuickSummary({
  data,
  t,
  className,
}: QuickSummary) {
  console.log("FROM quick summary  " + data.Start_Price);
  console.log("FROM quick summary  " + data.status);
  console.log("FROM quick summary  " + data.start_bedrooms);

  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-5 3xl:grid-cols-2 ss:grid-cols-1  w-full ",
        className
      )}
    >
      {data?.Start_Price && (
        <li className="flex gap-1 justify- text-lg ">
          <h4 className=" min-w-fit font-medium">
            {t("QuickSummary.Start_Price")}
          </h4>
          {/* {t("QuickSummary.price_formatted", {
            price: data?.Start_Price,
          })} */}
          {data?.Start_Price}
        </li>
      )}
      {data?.status && (
        <li className="flex gap-1 justify- text-lg">
          <h4 className=" min-w-fit font-medium">{t("QuickSummary.status")}</h4>
          <h5 className=""> {data?.status}</h5>
        </li>
      )}
      {data?.start_rooms && (
        <li className="flex gap-1 justify- text-lg">
          <h4 className=" min-w-fit font-medium">
            {t("QuickSummary.start_rooms")}
          </h4>
          <h5 className=""> {data?.start_rooms}</h5>
        </li>
      )}
      {data?.start_bedrooms && (
        <li className="flex gap-1 justify- text-lg">
          <h4 className=" min-w-fit font-medium">
            {t("QuickSummary.start_bedrooms")}
          </h4>
          <h5 className=""> {data?.start_bedrooms}</h5>
        </li>
      )}
      {data?.delivery_time && (
        <li className="flex gap-1 justify- text-lg">
          <h4 className=" min-w-fit font-medium">
            {t("QuickSummary.delivery_time")}
          </h4>
          <h5 className=""> {data?.delivery_time}</h5>
        </li>
      )}
      {data?.total_units && (
        <li className="flex gap-1 justify- text-lg">
          <h4 className=" min-w-fit font-medium">
            {t("QuickSummary.total_units")}
          </h4>
          <h5 className=""> {data?.total_units}</h5>
        </li>
      )}
    </ul>
  );
});

export default ProjectQuickSummary;
