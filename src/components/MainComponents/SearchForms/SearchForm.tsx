import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import {
  ComboBox,
  SelectBox,
  SubmitBtnComponent,
  TextComponent,
} from "../../FormComponents";
import PricePopover from "./PricePopover";
import AminitiesPopover from "./AminitiesPopover";
import { defaultData } from "../../../Utilities/style";

function SearchForm({ formFor }: { formFor?: string }) {
  const [searchParams] = useSearchParams();

  const URLParams = Object.fromEntries(searchParams.entries());

  type FormValues = {
    // ! old Properties
    // sale_rent: string;
    // keyword: string;
    // property_type: string;
    // region: number | string;
    // min_price: number | string;
    // max_price: number | string;
    // currency: number | string;
    // aminities: number[];
    // finishing?: number;
    // purpose?: number;
    // min_bathes?: number;
    // min_beds?: number;
    // min_area?: number;
    // max_area?: number;

    // sale_rent: string;

    //? random string
    keyword: string;

    // ? lisa mesh m3aya
    country?: string;
    city?: string;
    region: number | string | any;
    sub_region?: number | string | any;

    // ? araga3 all location
    LocationsData: string;

    // * mwgood
    property_type?: string;

    // * mwgood
    aminities: number[] | any;

    // *mwgood
    purpose?: number | any;

    // * random numbers
    min_beds?: number | any;
    min_bathes?: number | any;

    // * random numbers
    max_area?: number | any;
    min_area?: number | any;

    // * random numbers
    max_price: number | string | any;
    min_price?: number | string | any;

    // * mwgood laken fe makan tany
    price_arrange_keys?: number | string | any;

    // *mwgood
    currency: number | string | any;
    // *mwgood
    finishing?: string;

    page?: number | any;
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
      // sale_rent: "1",
      keyword: URLParams.k?.replace(/-/g, " ") || "",

      property_type: URLParams.t || "",

      country: "",
      city: "",
      region: URLParams.r || "",
      sub_region: "",

      finishing: "",

      min_price: URLParams.pf || "",
      max_price: URLParams.pt || "",

      currency: URLParams.crn?.replace(/-/g, " ") || "",

      aminities: [],
    },
  });

  const { t, i18n } = useTranslation("MainComponents_SearchForm");

  //!--- getValues values from API ----

  const { data: externalData } = useExternalData();

  const { data: CurrenciesData } = useFetchData(
    "currencies",
    import.meta.env.VITE_PROPERTIES_CURRENCIES,
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

  const { data: aminitiesData } = useFetchData(
    "aminities",
    import.meta.env.VITE_PROPERTY_AMINITIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const { data: LocationsData } = useFetchData(
    "locations",
    import.meta.env.VITE_ALL_LOCATIONS,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );

  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const navigate = useNavigate();

  // const sale_rent = watch("sale_rent");

  const onSubmit = (data: FormValues) => {
    if (isValid) {
      const aminities = data?.aminities
        .filter((item) => typeof item !== "boolean")
        .map((item) => parseInt(item as any));
      //srt is set to 0 initially because it is handled from the search page (sort by) not from the from, also the backend need to don't send the srt with the value unless the sort by selections is clicked
      //cr=?country

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
          p: data?.min_bathes
            ? (data?.min_bathes as unknown as string)?.replace(/,/g, "")
            : searchParams.get("p")
            ? searchParams.get("p")
            : "",
          b: data?.min_beds
            ? (data?.min_beds as unknown as string)?.replace(/,/g, "")
            : searchParams.get("b")
            ? searchParams.get("b")
            : "",
          // sor: data?.sale_rent
          //   ? data?.sale_rent
          //   : searchParams.get("sor")
          //   ? searchParams.get("sor")
          //   : "",
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
            ? (data?.min_price as string)?.replace(/,/g, "")
            : searchParams.get("pf")
            ? searchParams.get("pf")
            : "",
          pt: data?.max_price
            ? (data?.max_price as string)?.replace(/,/g, "")
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
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className={`hero__right--form  site_container   flex flex-col items-center justify-center  bg-background   `}
    >
      <div className="form_fields grid gap-4 grid-cols-4 lg:grid-cols-2  sm:grid-cols-1 w-3/4 xl:w-full shadow-xl rounded-sm p-5">
        {/**
                 //!------- keyword  -------
         */}
        <TextComponent
          color={defaultData.color.basic_color && defaultData.color.basic_color}
          t={t}
          register={register}
          name="keyword"
          label={t("keyword.label")}
          placeholder={t("keyword.placeholder")}
          errors={errors}
          className="w-full h-auto"
          withIcon={false}
          required={false}
          confirmFor
        />
        {/**
               //!------- property_type  -------
         */}
        <div
          style={{
            color: `${
              defaultData.color.basic_color && defaultData.color.basic_color
            }`,
          }}
          className="flex w-full flex-col     items-start text-lg justify-center gap-2 text-temp_secondary"
        >
          {t("property_type.label")}

          <ComboBox
            color={
              defaultData.color.basic_color && defaultData.color.basic_color
            }
            searchParams={searchParams}
            data={PropertyTypesData}
            setValue={setValue}
            placeholder={t("property_type.placeholder")}
            stateName={"property_type"}
            getDefaultValueFromURL="t"
          />
        </div>
        {/**
                 //!------- (STOPPED) All Locations  -------
         */}
        <div
          style={{
            color: `${
              defaultData.color.basic_color && defaultData.color.basic_color
            }`,
          }}
          className="flex w-full flex-col    items-start text-lg justify-center gap-2 text-temp_secondary"
        >
          {t("region.label")}

          <ComboBox
            searchParams={searchParams}
            data={LocationsData}
            setValue={setValue}
            placeholder={t("region.placeholder")}
            stateName={"region"}
            getDefaultValueFromURL="r"
          />
        </div>
        {/**
                 //!------- price  -------
         */}
        <div
          style={{
            color: `${
              defaultData.color.basic_color && defaultData.color.basic_color
            }`,
          }}
          className="flex w-full flex-col    items-start text-lg justify-center gap-2 "
        >
          {t("price.label")}

          <PricePopover
            t={t}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            placeholder={t("price.placeholder")}
          />
        </div>
        {/**
                 //!------- currency  -------
         */}
        <div
          style={{
            color: `${
              defaultData.color.basic_color && defaultData.color.basic_color
            }`,
          }}
          className="flex w-full flex-col    items-start text-lg justify-center gap-2 text-temp_secondary"
        >
          {t("currency.label")}

          <SelectBox
            searchParams={searchParams}
            data={CurrenciesData}
            placeholder={t("currency.placeholder")}
            stateName={"currency"}
            getDefaultValueFromURL="crn"
          />
        </div>{" "}
        {/**
                 //!------- aminities  -------
         */}
        <div
          style={{
            color: `${
              defaultData.color.basic_color && defaultData.color.basic_color
            }`,
          }}
          className="flex w-full flex-col  items-start text-lg justify-center gap-2 text-temp_secondary col-span-2 lg:col-span-1"
        >
          {t("aminities.label")}
          <AminitiesPopover
            data={aminitiesData}
            register={register}
            watch={watch}
            placeholder={t("aminities.placeholder")}
          />
        </div>
        {/**
                 //!------- Submit Button  -------
         */}
        <div className="flex w-full flex-col    items-start text-lg justify-center gap-2 text-temp_secondary lg:col-span-2 sm:col-span-1">
          <span className="opacity-0 pointer-events-none">
            {t("Submit_Button")}
          </span>
          <SubmitBtnComponent
            disabled={!isValid}
            value={t("Submit_Button")}
            className="mt-0"
          />
        </div>
      </div>
    </form>
  );
}
export default SearchForm;
