import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import {
  ComboBox,
  NumberComponent,
  SelectBox,
  SubmitBtnComponent,
  TextComponent,
} from "../../FormComponents";
import RangeSlider from "./Components/RangeSlider";
import { HeadingUnderline } from "@/components/MainComponents";
import AminitiesPopover from "./AminitiesPopover";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { defaultData } from "../../../Utilities/style.js";

type props = {
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
};
function SideBarSearchForm({ setCategory }: props) {
  const { t, i18n } = useTranslation("MainComponents_SideBarSearchForm");
  const { data: externalData } = useExternalData();

  const { data: RegionsData } = useFetchData(
    "locations",
    import.meta.env.VITE_ALL_LOCATIONS,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: aminitiesData } = useFetchData(
    "aminities",
    import.meta.env.VITE_PROPERTY_AMINITIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: PropertyTypesData } = useFetchData(
    "propertyTypes",
    import.meta.env.VITE_PROPERTY_TYPES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: PropertyFinishingData } = useFetchData(
    "propertyFinishing",
    import.meta.env.VITE_PROPERTY_FINISHING,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: CurrenciesData } = useFetchData(
    "currencies",
    import.meta.env.VITE_PROPERTIES_CURRENCIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: purposeData } = useFetchData(
    "purpose",
    import.meta.env.VITE_PROPERTY_PURPOSE,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  //TODO needs to be handled from the search page (accept it from the url then send it with the data), and from the search form (sale_rent)
  // const { data: MaxPrice } = useFetchData(
  //   "maxprice",
  //   import.meta.env.VITE_MAXPRICE,
  //   false,
  //   false,
  //   "",
  //   30 * 60 * 1000,
  //   30 * 60 * 1000
  // );
  const [searchParams] = useSearchParams();

  const { data: cats } = useFetchData(
    "PropertiesCategories",
    import.meta.env.VITE_PROPERTIES_CATEGORIES
  );

  useEffect(() => {
    if (searchParams.get("ci") && searchParams.get("ci") !== "-1") {
      setCategory(
        cats?.find((item) => item.id == searchParams.get("ci"))?.title
      );
    }
  }, [cats, setCategory, searchParams]);

  // function getMax() {
  //   const maxprice = axios.get(`${import.meta.env.VITE_Property_Max_Price}`);
  //   console.log(
  //     "max price we have API " + import.meta.env.VITE_Property_Max_Price
  //   );
  //   console.log("max price we have API " + maxPrice);

  //   return maxprice;
  // }

  // const { data: maxPrice } = useQuery({
  //   queryKey: ["maxprice"],
  //   queryFn: () => getMax(),
  //   select: (data) => {
  //     return data.data as number;
  //   },
  // });
  const { data: maxPrice } = useFetchData(
    "MaxPrice",
    `${import.meta.env.VITE_Property_Max_Price}`,
    false,
    false
  );
  console.log("max price we have" + maxPrice);

  const StatusData = [
    { id: 1, title: t("status.selections.for_sale") },
    {
      id: 2,
      title: t("status.selections.for_rent"),
    },
    {
      id: 3,
      title: t("status.selections.for_both"),
    },
  ];

  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const navigate = useNavigate();

  const URLParams = Object.fromEntries(searchParams.entries());

  type FormValues = {
    // sale_rent: string;
    keyword: string | any;
    property_type: string;
    region: number | string | any;
    min_price: number | string | any;
    max_price: number | string | any;
    currency: number | string | any;
    finishing?: number | string | any;
    purpose?: number | string | any;
    min_bathes?: number | string | any;
    min_beds?: number | string | any;
    min_area?: number | string | any;
    max_area?: number | string | any;
    aminities: number[] | any;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      keyword: URLParams.k?.replace(/-/g, " ") || "",
      region: URLParams.r || "",
      property_type: URLParams.t || "",
      currency: URLParams.crn || "",
      // sale_rent: URLParams.sor || "1",
      min_beds: URLParams.b || "",
      min_bathes: URLParams.p || "",
      purpose: URLParams.pr || "",
      min_area: URLParams.af || "",
      max_area: URLParams.at || "",
      min_price: URLParams.pf || "",
      max_price: URLParams.pt || "",
      finishing: URLParams.f || "",
      aminities: [],
    },
  });

  const finishing = watch("finishing");

  const onSubmit = (data: FormValues) => {
    if (isValid) {
      const aminities = data?.aminities
        .filter((item) => typeof item !== "boolean")
        .map((item) => parseInt(item as unknown as string));
      //srt is set to 0 initially because it is handled from the search page (sort by) not from the from, also the backend need to don't send the srt with the value unless the sort by selections is clicked
      //cr=?country
      console.log("SEARCH SIDE", data);
      console.log("SEARCH SIDE" + JSON.stringify(data?.purpose));

      navigate(
        `/${lang}/search?${new URLSearchParams({
          k: data?.keyword?.replace(/\s/g, "-"),
          cr: searchParams.get("cr") || "-1",
          c: searchParams.get("c") || "-1",
          r: data?.region
            ? data?.region
            : searchParams.get("r")
            ? searchParams.get("r")
            : "-1",
          t: data?.property_type,
          f: data?.finishing
            ? data?.finishing
            : searchParams.get("f")
            ? searchParams.get("f")
            : "",
          pr: data?.purpose
            ? data?.purpose
            : searchParams.get("pr")
            ? searchParams.get("pr")
            : "",
          p: (data?.min_bathes as string)?.replace(/,/g, ""),
          b: (data?.min_beds as string)?.replace(/,/g, ""),
          // sor: data?.sale_rent,
          af: data?.min_area
            ? data?.min_area
            : searchParams.get("af")
            ? searchParams.get("af")
            : "",
          at: data?.max_area
            ? data?.max_area
            : searchParams.get("at")
            ? searchParams.get("at")
            : "",
          pf: data?.min_price
            ? data?.min_price
            : searchParams.get("pf")
            ? searchParams.get("pf")
            : "",
          pt: data?.max_price
            ? data?.max_price
            : searchParams.get("pt")
            ? searchParams.get("pt")
            : "",
          crn: data?.currency
            ? data?.currency
            : searchParams.get("crn")
            ? searchParams.get("crn")
            : "",
          srt: searchParams.get("srt") || "0",
          page: "1",
        })}`,
        { state: aminities }
      );
    } else toast.error(t("toast_error"));
  };

  return (
    <section className="w-full p-6 shadow-xl">
      <HeadingUnderline textcolor={defaultData.color} className="mb-9">
        {t("heading")}
      </HeadingUnderline>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className={`sidebar__search--form  w-full   flex flex-col   bg-background gap-5  `}
      >
        {/**
                 //!------- keyword  -------
         */}
        <TextComponent
          t={t}
          register={register}
          name="keyword"
          placeholder={t("keyword.placeholder")}
          errors={errors}
          className="w-full h-auto"
          withIcon={false}
          required={false}
          confirmFor
        />
        {/**
                 //!------- Regions-------
         */}
        <ComboBox
          searchParams={searchParams}
          data={RegionsData}
          setValue={setValue}
          placeholder={t("regions.placeholder")}
          stateName={"region"}
          getDefaultValueFromURL="r"
        />
        {/**
               //!------- property_type  -------
         */}
        <ComboBox
          searchParams={searchParams}
          data={PropertyTypesData}
          setValue={setValue}
          placeholder={t("property_type.placeholder")}
          stateName={"property_type"}
          getDefaultValueFromURL="t"
        />
        {/**
              //!------- Currency  -------
         */}

        <div
          style={{
            color: `${defaultData.color && defaultData.color}`,
          }}
          className="flex w-full flex-col    items-start text-lg justify-center gap-2 text-temp_secondary"
        >
          <SelectBox
            searchParams={searchParams}
            data={CurrenciesData}
            setValue={setValue}
            placeholder={t("currency.placeholder")}
            stateName={"currency"}
            getDefaultValueFromURL="crn"
          />
        </div>

        {/**
              //!------- Finishing  -------
         */}
        <div
          style={{
            color: `${defaultData.color && defaultData.color}`,
          }}
          className="flex w-full flex-col    items-start text-lg justify-center gap-2 text-temp_secondary"
        >
          <ComboBox
            selectBox
            setValue={setValue}
            data={PropertyFinishingData}
            // placeholder={t("form.finishing.placeholder")}
            placeholder={t("finishing.placeholder")}
            stateName="finishing"
            light
          />
        </div>
        {/**

        {/**
                 //!------- Purpose  -------
         */}
        <ComboBox
          searchParams={searchParams}
          data={purposeData}
          setValue={setValue}
          placeholder={t("purpose.placeholder")}
          stateName={"purpose"}
          getDefaultValueFromURL="pr"
        />
        {/* <SelectBox
          searchParams={searchParams}
          data={purposeData}
          setValue={setValue}
          placeholder={t("purpose.placeholder")}
          getDefaultValueFromURL="pr"
        /> */}
        {/**
                 //!------- aminities  -------
         */}
        <AminitiesPopover
          sidebar
          data={aminitiesData}
          register={register}
          watch={watch}
          placeholder={t("aminities.placeholder")}
        />
        {/**
                 //!------- Bedrooms & Bathrooms  -------
         */}
        <div className="w-full flex gap-5 sm:flex-col">
          {/**
                 //!------- Bedrooms   -------
         */}
          <NumberComponent
            t={t}
            register={register}
            setValue={setValue}
            errors={errors}
            name="min_beds"
            withIcon={false}
            placeholder={t("min_beds.placeholder")}
            required={false}
            className="w-1/2 h-auto"
            confirmFor
          />
          {/**
                 //!-------  Bathrooms  -------
         */}

          <NumberComponent
            t={t}
            register={register}
            setValue={setValue}
            errors={errors}
            withIcon={false}
            name="min_bathes"
            placeholder={t("min_bathes.placeholder")}
            required={false}
            className="w-1/2 h-auto"
            confirmFor
          />
        </div>
        {/**
                 //!------- Price Range Slider  -------
         */}
        {/* <RangeSlider
          defaultValue={[500, 1000]}
          min={500}
          max={50000}
          step={1000}
          minStepsBetweenThumbs={2000}
          onValueCommit={(value) => {
            setValue("min_price", value[0]);
            setValue("max_price", value[1]);
          }}
          name={t("price_range_slider.name")}
          label={t("price_range_slider.label")}
          t={t}
        /> */}
        {maxPrice && (
          <RangeSlider
            defaultValue={[500, maxPrice / 2]}
            min={500}
            max={maxPrice}
            step={1000}
            minStepsBetweenThumbs={10}
            onValueCommit={(value) => {
              setValue("min_price", value[0]);
              setValue("max_price", value[1]);
            }}
            name={t("price_range_slider.name")}
            label={t("price_range_slider.label")}
            t={t}
          />
        )}
        {/**
                 //!------- Area Range Slider  -------
         */}
        <RangeSlider
          defaultValue={[100, 500]}
          min={50}
          max={1000}
          step={10}
          minStepsBetweenThumbs={10}
          measurement={lang === "ar" ? "م²" : "sqft"}
          onValueCommit={(value) => {
            setValue("min_area", value[0]);
            setValue("max_area", value[1]);
          }}
          name={t("area_range_slider.name")}
          label={t("area_range_slider.label")}
          t={t}
        />
        {/**
                 //!------- Submit Button  -------
         */}
        <SubmitBtnComponent
          disabled={!isValid}
          value={t("Submit_Button")}
          className=""
        />
      </form>
    </section>
  );
}
export default SideBarSearchForm;
