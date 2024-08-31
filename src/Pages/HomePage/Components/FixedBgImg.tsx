import { LangLink } from "@/components/MainComponents";
import { TFunction } from "i18next";

interface IFixedBgImgProps {
  data: {
    image: string;
    title: string;
    sub_title: string;
  };
  t: TFunction;
}
function FixedBgImg({ data, t }: IFixedBgImgProps) {
  return (
    <section className=" mb-20 mt-24  flex site_container  lg:flex-col lg:items-center  min-h-[500px]  ">
      <div className="FixedBgImg__left w-1/2 h-auto    lg:w-full   px-16 xl:px-9 lg:py-10 flex flex-col justify-center lg:items-center bg-black text-background">
        <h3 className="font-bold uppercase border-l-[3px] border-l-accnt rtl:border-l-[0px] rtl:border-r-[3px] rtl:border-r-accnt  pl-3 rtl:pl-0 rtl:pr-3 text-lg  w-full ">
          {data?.title}
        </h3>

        <h4 className="text-[2.5rem] xl:text-4xl font-medium mt-6 line-clamp-4">
          {data?.sub_title}
        </h4>
        <div className="flex gap-5 w-fit  mt-4 lg:mt-7 sm:flex-col">
          <LangLink
            className="!w-fit mx-auto custom__btn__accent"
            to={`/search?roc=1&rocsr=2`}
            id="custom__btn"
          >
            <span>{t("FixedBgImg.main_CTA_1")}</span>
          </LangLink>{" "}
          <LangLink
            className="!w-fit mx-auto custom__btn__accent"
            to={`/search?roc=1&rocsr=1`}
            id="custom__btn"
          >
            <span>{t("FixedBgImg.main_CTA_2")}</span>
          </LangLink>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url('${data?.image}')` }}
        className="FixedBgImg__right bg-cover	bg- w-1/2 aspect-square max-h-[500px]  lg:w-full  bg-fixed bg-no-repeat  lg:bg-center  lg:h-[400px] "
      ></div>{" "}
    </section>
  );
}

export default FixedBgImg;
