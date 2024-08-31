// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useRef } from "react";
// import { useState } from "react";
// import {
//   useForm,
//   useFieldArray,
//   FieldValues,
//   UseFormRegister,
//   FieldErrors,
// } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import {
//   Heading,
//   HeadingUnderline,
//   HelmetTags,
// } from "@/components/MainComponents/index.js";
// import { useFetchData, usePostData } from "@/Hooks/useAxios.js";
// import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.js";
// import { userData } from "@/app/Features/AuthenticationSlice.js";
// import TextComponent from "@/components/FormComponents/TextComponent.js";
// import Captcha from "@/components/FormComponents/Captcha.js";
// import SubmitBtnComponent from "@/components/FormComponents/SubmitBtnComponent.js";
// import CheckBox from "@/components/FormComponents/CheckBox.js";
// import { TFunction } from "i18next";
// import { DragDropArea } from "@/components/SubComponents";
// import {
//   ComboBox,
//   NumberComponent,
//   UploadFileComponent,
// } from "@/components/FormComponents";
// import { useHandleLogOut } from "@/Utilities";
// import { setCurrentUserMenuTab as setCurrTab } from "@/app/Features/MiscellaneousSlice";

// type DynamicFieldProps<T extends FieldValues> = {
//   register: UseFormRegister<T>;
//   dirtyFields: { [index: string]: boolean };
//   confirmName: string;
//   id: number;
//   length: number;
//   callBkFn: () => void;
//   errors: FieldErrors;
//   ServerErrors: [];
//   index: number;
//   t: TFunction;
// };

// function DynamicField<T extends FieldValues>(props: DynamicFieldProps<T>) {
//   return (
//     <div className="property__dynamic--fields--row flex ss:flex-col w-full  h-[100px] ss:h-fit items-start ss:items-center justify-between gap-10 px-16 ss:px-0 md:gap-2">
//       <div className=" key flex w-1/2 ss:w-full  max-w-[430px] flex-col items-start justify-center gap-2 ">
//         <label className="w-full " htmlFor={`key_${props.index + 1}`}>
//           {props.t("form.Quick_Summary.Title.label")}
//         </label>
//         <input
//           className={` light-bg-inputs w-full `}
//           type="text"
//           name={`key_${props.index + 1}`}
//           id={`key_${props.index + 1}`}
//           placeholder={props.t("form.Quick_Summary.Title.placeholder")}
//           autoComplete="on"
//           {...props.register(`summary.${props.index}.key`, {
//             required: props.length === 1 ? false : true,
//           })}
//         />
//         {props.errors?.summary?.[props.index]?.key && (
//           <p className="text-xs text-red-500 ">
//             {props.errors?.summary?.[props.index]?.key.type === "required" &&
//               props.t("form.Quick_Summary.Title.required_err_msg")}
//           </p>
//         )}

//         {
//           //!--- server errors --------
//           props.ServerErrors?.[props.index]?.key && (
//             <p className="pt-2 text-xs text-red-500">
//               {props.ServerErrors?.[props.index]?.key[0]}
//             </p>
//           )
//         }
//       </div>
//       {/**
//        * //!-----------value
//        */}
//       <div className=" value flex w-1/2 ss:w-full  max-w-[430px] flex-col items-start justify-center gap-2 ">
//         <label className="w-full " htmlFor={`value_${props.index + 1}`}>
//           {props.t("form.Quick_Summary.Value.label")}
//         </label>
//         <input
//           className={` light-bg-inputs w-full `}
//           type="text"
//           name={`value_${props.index + 1}`}
//           id={`value_${props.index + 1}`}
//           placeholder={props.t("form.Quick_Summary.Value.placeholder")}
//           autoComplete="on"
//           {...props.register(`summary.${props.index}.value`, {
//             required: props.length === 1 ? false : true,
//           })}
//         />
//         {props.errors?.summary?.[props.index]?.value && (
//           <p className="text-xs text-red-500 ">
//             {props.errors?.summary?.[props.index]?.value.type === "required" &&
//               props.t("form.Quick_Summary.Value.required_err_msg")}{" "}
//           </p>
//         )}

//         {
//           //!--- server errors --------
//           props.ServerErrors?.response?.data?.errors?.summary?.[props.index]
//             ?.value && (
//             <p className="pt-2 text-xs text-red-500">
//               {
//                 props.ServerErrors?.response?.data?.errors?.summary?.[
//                   props.index
//                 ]?.value[0]
//               }
//             </p>
//           )
//         }
//       </div>

//       {/**
//        * //!-----------delete
//        */}
//       <div className="h-full flex items-center">
//         <button
//           type="button"
//           onClick={() => props.callBkFn?.()}
//           className={` group  rounded-md pt-2 pb-1 px-[6px] trns bg-delete text-background  hover:bg-transparent border-delete border-2 hover:text-delete active:scale-90    ${
//             props.index === 0 && "hidden"
//           }`}
//         >
//           <FontAwesomeIcon
//             className=" text-xl  group-hover:text-light active:scale-90"
//             icon={faTrash}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }

// export function Component() {
//   type FormValues = {
//     property_title_en: string;
//     property_title_ar: string;
//     address_en: string;
//     address_ar: string;
//     video: string;
//     location: string;
//     building_num: string;

//     floor_num: string;
//     apartment_num: string;
//     unit_floor: string;
//     garage_no: string;
//     living_room: string;
//     total_area: string;
//     land_area: string;
//     garage_size: string;
//     no_floors: string;
//     room_ensuite: string;
//     reception_pieces: string;
//     bath_room_no: string;
//     bed_rooms_no: string;
//     kitchens_no: string;
//     sale_price: string;
//     rent_price: string;

//     purpose: string;
//     category: string;
//     priority: string;

//     country: string;
//     city: string;
//     region: string;

//     currency: number;
//     finishing: string;
//     reception_floor_type: string;

//     property_type: string;

//     aminities: number[];
//     sliders: [];
//     summary: { key: string; value: string }[];

//     property_description_en: string;
//     property_description_ar: string;

//     primary_image: string;
//     for_what: string;
//     rent_duration: string;

//     not_ropot: string;
//     from: string;
//     on_site: string;
//   };
//   const [userProfileData, refetchUserProfileData] = useOutletContext();

//   const [ResetAuthStatesWithToast] = useHandleLogOut();
//   const dispatchRedux = useAppDispatch();

//   const { t } = useTranslation("Pages_SubmitProperty");
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, dirtyFields },
//     reset,
//     watch,
//     setValue,
//     control,
//   } = useForm<FormValues>({
//     mode: "onChange",
//     defaultValues: {
//       property_title_en: "",
//       property_title_ar: "",
//       address_en: "",
//       address_ar: "",
//       video: "",
//       location: "",
//       building_num: "",

//       floor_num: "",
//       apartment_num: "",
//       unit_floor: "",
//       garage_no: "",
//       living_room: "",
//       total_area: "",
//       land_area: "",
//       garage_size: "",
//       no_floors: "",
//       room_ensuite: "",
//       reception_pieces: "",
//       bath_room_no: "",

//       bed_rooms_no: "",
//       kitchens_no: "",
//       sale_price: "",
//       rent_price: "",

//       purpose: "",
//       category: "",
//       priority: "",

//       country: "",
//       city: "",
//       region: "",

//       currency: 1,
//       finishing: "",
//       reception_floor_type: "",

//       property_type: "",

//       aminities: [],
//       sliders: [],
//       summary: [{ key: "", value: "" }],

//       property_description_en: "",
//       property_description_ar: "",

//       primary_image: "",
//       for_what: "",
//       rent_duration: "",

//       not_ropot: "no",
//       from: "Web",
//       on_site: "yes",
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     name: "summary",
//     control,
//   });

//   //!--- getValues values ----

//   const purpose = watch("purpose");
//   const category = watch("category");
//   const priority = watch("priority");

//   const country = watch("country");
//   const city = watch("city");
//   const region = watch("region");

//   const finishing = watch("finishing");
//   const reception_floor_type = watch("reception_floor_type");

//   const property_type = watch("property_type");

//   const aminities = watch("aminities");
//   const sliders = watch("sliders");

//   const property_description_en = watch("property_description_en");
//   const property_description_ar = watch("property_description_ar");

//   const not_ropot = watch("not_ropot");
//   const for_what = watch("for_what");
//   const rent_duration = watch("rent_duration");
//   /*   console.log("property_description_en",property_description_en);
//    */ const priorityData = [
//     { id: "normal", title: t("form.priority.selections.Normal") },
//     {
//       id: "featured",
//       title: t("form.priority.selections.Featured"),
//     },
//   ];
//   const RentDurationData = [
//     { id: "daily", title: t("form.rent_duration.selections.daily") },
//     { id: "monthly", title: t("form.rent_duration.selections.monthly") },
//     { id: "3_months", title: t("form.rent_duration.selections.3_months") },
//     { id: "6_months", title: t("form.rent_duration.selections.6_months") },
//     { id: "9_months", title: t("form.rent_duration.selections.9_months") },
//     { id: "yearly", title: t("form.rent_duration.selections.yearly") },
//   ];
//   const ForWhatData = [
//     { id: "for_sale", title: t("form.for_what.selections.for_sale") },
//     {
//       id: "for_rent",
//       title: t("form.for_what.selections.for_rent"),
//     },
//     {
//       id: "for_both",
//       title: t("form.for_what.selections.for_both"),
//     },
//   ];
//   const { data: categoriesData } = useFetchData(
//     "categories",
//     import.meta.env.VITE_PROPERTIES_CATEGORIES,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );

//   const { data: countriesData } = useFetchData(
//     "countries",
//     import.meta.env.VITE_COUNTRIES_REGISTER,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );
//   const { data: citiesData, refetch: refetchCities } = useFetchData(
//     "cities",
//     `${import.meta.env.VITE_CITIES_BASED_ON_COUNTRIES_REGISTER}${country}`,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000,
//     !!country
//   );

//   const { data: regionsData, refetch: refetchRegions } = useFetchData(
//     "regions",
//     `${import.meta.env.VITE_REGIONS_BASED_ON_CITIES_REGISTER}${city}`,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000,
//     !!city
//   );
//   const { data: PurposeData } = useFetchData(
//     "PurposeData",
//     import.meta.env.VITE_PROPERTY_PURPOSE,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );
//   const { data: PropertyFinishingData } = useFetchData(
//     "propertyFinishing",
//     import.meta.env.VITE_PROPERTY_FINISHING,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );
//   const { data: ReceptionFloorTypeData } = useFetchData(
//     "receptionFloorType",
//     import.meta.env.VITE_RECEPTION_FLOOR_TYPE,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );
//   const { data: PropertyTypesData } = useFetchData(
//     "propertyTypes",
//     import.meta.env.VITE_PROPERTY_TYPES,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );
//   const { data: PropertyaminitiesData } = useFetchData(
//     "propertyaminities",
//     import.meta.env.VITE_PROPERTY_aminities,
//     false,
//     false,
//     "",
//     30 * 60 * 1000,
//     30 * 60 * 1000
//   );

//   const captchaRef = useRef(null);
//   //here we need to use the submitted state to display the error msg of the combox only if hte user submitted and no data selected, wheres initially there is no data selected and without the submitted the error msg will be displayed at the first render

//   const [submitted, setSubmitted] = useState(false);
//   const [allFieldsFilled, setAllFieldsFilled] = useState(false);
//   const user = useAppSelector(userData);

//   useEffect(() => {
//     if (
//       purpose !== "" &&
//       category !== "" &&
//       priority !== "" &&
//       country !== "" &&
//       city !== "" &&
//       region !== "" &&
//       finishing !== "" &&
//       reception_floor_type !== "" &&
//       property_type !== "" &&
//       aminities.length > 0 &&
//       sliders.length > 0 &&
//       property_description_en !== "" &&
//       property_description_ar !== "" &&
//       for_what !== ""
//     ) {
//       setAllFieldsFilled(true);
//     } else {
//       setAllFieldsFilled(false);
//     }
//   }, [
//     purpose,
//     category,
//     priority,
//     country,
//     city,
//     region,
//     finishing,
//     reception_floor_type,
//     property_type,
//     aminities.length,
//     sliders.length,
//     property_description_en,
//     property_description_ar,
//     for_what,
//   ]);

//   //!-- to handle if the user selects a country then choose another country, so refetch the cities of that country
//   useEffect(() => {
//     if (country !== "") {
//       refetchCities();
//     }
//   }, [country, refetchCities]);
//   useEffect(() => {
//     if (city !== "") {
//       refetchRegions();
//     }
//   }, [city, refetchRegions]);

//   const {
//     mutate,
//     isPending,
//     error: ServerErrors,
//   } = usePostData(true, () => {
//     captchaRef?.current?.resetCaptcha();
//     dispatchRedux(setCurrTab(""));
//     reset();
//     setValue("not_ropot", "no");
//     navigate(-1);
//     setSubmitted(false);
//   });

//   const onSubmit = (data: FormValues) => {
//     //!  validations done in useEffect: at least one amentias, at least one slider img
//     setSubmitted(true);

//     if (allFieldsFilled) {
//       if (not_ropot === "no") {
//         captchaRef?.current?.execute();
//       } else {
//         const aminities = data?.aminities.filter(
//           (item) => typeof item !== "boolean"
//         );

//         const finalData = {
//           ...data,
//           primary_image: data?.primary_image[0],
//           building_num: (data?.building_num as string)?.replace(/,/g, ""),
//           floor_num: (data?.floor_num as string)?.replace(/,/g, ""),
//           apartment_num: (data?.apartment_num as string)?.replace(/,/g, ""),
//           unit_floor: (data?.unit_floor as string)?.replace(/,/g, ""),
//           garage_no: (data?.garage_no as string)?.replace(/,/g, ""),
//           living_room: (data?.living_room as string)?.replace(/,/g, ""),
//           total_area: (data?.total_area as string)?.replace(/,/g, ""),
//           land_area: (data?.land_area as string)?.replace(/,/g, ""),
//           garage_size: (data?.garage_size as string)?.replace(/,/g, ""),
//           no_floors: (data?.no_floors as string)?.replace(/,/g, ""),
//           room_ensuite: (data?.room_ensuite as string)?.replace(/,/g, ""),
//           reception_pieces: (data?.reception_pieces as string)?.replace(
//             /,/g,
//             ""
//           ),
//           bath_room_no: (data?.bath_room_no as string)?.replace(/,/g, ""),
//           bed_rooms_no: (data?.bed_rooms_no as string)?.replace(/,/g, ""),
//           kitchens_no: (data?.kitchens_no as string)?.replace(/,/g, ""),
//           sale_price: (data?.sale_price as string)?.replace(/,/g, ""),
//           rent_price: (data?.building_num as string)?.replace(/,/g, ""),
//           aminities: JSON.stringify(aminities),
//           summary: JSON.stringify(data?.summary),
//         };
//         mutate({
//           api: import.meta.env.VITE_SUBMIT_PROPERTY,
//           data: finalData,
//           file: true,
//         });
//         //console.log("finalData", finalData);
//       }
//     } else {
//       toast.error(t("form.error.fill_required"));
//     }
//   };
//   return (
//     <section>
//       <Heading className="text-center mb-5">{t("heading")}</Heading>

//       <div className="bg-grey p-5 rounded-lg text-temp_secondary">
//         <HelmetTags
//           title={`${userProfileData?.name || ""} ${t("tab.title")}`}
//           description={`${userProfileData?.name || ""} ${t("tab.description")}`}
//           index={false}
//         />
//         <form
//           encType="multipart/form-data"
//           method="post"
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full flex flex-col items-start gap-6 "
//         >
//           <div className="Property__general--info flex flex-col items-start gap-1    w-full   bg">
//             {/*           <Heading>{t("heading")}</Heading>
//              */}{" "}
//             <HeadingUnderline className="text-2xl mb-6 ">
//               {t("sub_heading")}
//             </HeadingUnderline>
//             {/**
//              * //!------ Input Type text ----------
//              */}
//             {/**  Titles  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 name="property_title_en"
//                 label={t("form.property_title_en.label")}
//                 placeholder={t("form.property_title_en.placeholder")}
//                 validations={{
//                   pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
//                 }}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.property_title_en?.[0]
//                 }
//                 dir="ltr"
//               />

//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 name="property_title_ar"
//                 label={t("form.property_title_ar.label")}
//                 placeholder={t("form.property_title_ar.placeholder")}
//                 validations={{
//                   pattern:
//                     /^[\u0621-\u064A0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?؟\s]+$/i,
//                 }}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.property_title_ar?.[0]
//                 }
//                 dir="rtl"
//               />
//             </div>
//             {/**  Addresses  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               {" "}
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.address_en?.[0]
//                 }
//                 name="address_en"
//                 label={t("form.address_en.label")}
//                 placeholder={t("form.address_en.placeholder")}
//                 validations={{
//                   pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
//                 }}
//                 dir="ltr"
//               />
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 name="address_ar"
//                 label={t("form.address_ar.label")}
//                 placeholder={t("form.address_ar.placeholder")}
//                 validations={{
//                   pattern:
//                     /^[\u0621-\u064A0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?؟\s]+$/i,
//                 }}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.address_ar?.[0]
//                 }
//                 dir="rtl"
//               />
//             </div>
//             {/**  Video & Location  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={ServerErrors?.response?.data?.errors?.video?.[0]}
//                 name="video"
//                 label={t("form.video.label")}
//                 placeholder={t("form.video.placeholder")}
//               />
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.location?.[0]
//                 }
//                 name="location"
//                 label={t("form.location.label")}
//                 placeholder={t("form.location.placeholder")}
//               />
//             </div>
//             <div className="SubmitProperty__separator w-5/6 h-[1px] bg-slate-300 mx-auto mt-5 mb-9"></div>
//             {/**
//              * //!------ Input Type Number ----------
//              */}
//             {/**  Building Number & Floor Number & Apartment Number  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.building_num?.[0]
//                 }
//                 name="building_num"
//                 label={t("form.building_num.label")}
//                 placeholder={t("form.building_num.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.floor_num?.[0]
//                 }
//                 name="floor_num"
//                 label={t("form.floor_num.label")}
//                 placeholder={t("form.floor_num.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.apartment_num?.[0]
//                 }
//                 name="apartment_num"
//                 label={t("form.apartment_num.label")}
//                 placeholder={t("form.apartment_num.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//             </div>
//             {/**  Unit Floor & Garages Number & Living Room   */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 name="unit_floor"
//                 label={t("form.unit_floor.label")}
//                 placeholder={t("form.unit_floor.placeholder")}
//                 className="w-1/3 md:w-full"
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.unit_floor?.[0]
//                 }
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.garage_no?.[0]
//                 }
//                 name="garage_no"
//                 label={t("form.garage_no.label")}
//                 placeholder={t("form.garage_no.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.living_room?.[0]
//                 }
//                 name="living_room"
//                 label={t("form.living_room.label")}
//                 placeholder={t("form.living_room.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//             </div>
//             {/**  Total Area & Land Area & Garage Size  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.total_area?.[0]
//                 }
//                 name="total_area"
//                 label={t("form.total_area.label")}
//                 placeholder={t("form.total_area.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.land_area?.[0]
//                 }
//                 name="land_area"
//                 label={t("form.land_area.label")}
//                 placeholder={t("form.land_area.placeholder")}
//                 className="w-1/3 md:w-full"
//               />

//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.garage_size?.[0]
//                 }
//                 name="garage_size"
//                 label={t("form.garage_size.label")}
//                 placeholder={t("form.garage_size.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//             </div>
//             {/**  Floors Number & Room Ensuite & Reception Pieces  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.no_floors?.[0]
//                 }
//                 name="no_floors"
//                 label={t("form.no_floors.label")}
//                 placeholder={t("form.no_floors.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.room_ensuite?.[0]
//                 }
//                 name="room_ensuite"
//                 label={t("form.room_ensuite.label")}
//                 placeholder={t("form.room_ensuite.placeholder")}
//                 className="w-1/3 md:w-full"
//               />

//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.reception_pieces?.[0]
//                 }
//                 name="reception_pieces"
//                 label={t("form.reception_pieces.label")}
//                 placeholder={t("form.reception_pieces.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//             </div>
//             {/**  Bath Rooms Number & Bed Rooms Number & Kitchens Number  */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.bath_room_no?.[0]
//                 }
//                 name="bath_room_no"
//                 label={t("form.bath_room_no.label")}
//                 placeholder={t("form.bath_room_no.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.bed_rooms_no?.[0]
//                 }
//                 name="bed_rooms_no"
//                 label={t("form.bed_rooms_no.label")}
//                 placeholder={t("form.bed_rooms_no.placeholder")}
//                 className="w-1/3 md:w-full"
//               />

//               <NumberComponent
//                 setValue={setValue}
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors?.kitchens_no?.[0]
//                 }
//                 name="kitchens_no"
//                 label={t("form.kitchens_no.label")}
//                 placeholder={t("form.kitchens_no.placeholder")}
//                 className="w-1/3 md:w-full"
//               />
//             </div>
//             {/** Rent / Sale / Both Rent Price Per Month & Sale Price  */}
//             <div
//               className={`flex w-full items-start ${
//                 for_what === "for_both" ? "justify-between" : "justify-start"
//               }  gap-10 md:flex-col md:gap-1 `}
//             >
//               <div className="flex w-1/3 md:w-full max-w-[277px] md:max-w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.for_what.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={ForWhatData}
//                   placeholder={t("form.for_what.placeholder")}
//                   stateName="for_what"
//                   light
//                 />
//                 {submitted && for_what === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.for_what.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.for_what && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.for_what?.[0]}
//                     </p>
//                   )
//                 }
//               </div>

//               {(for_what === "for_sale" || for_what === "for_both") && (
//                 <NumberComponent
//                   setValue={setValue}
//                   t={t}
//                   name="sale_price"
//                   label={t("form.sale_price.label")}
//                   placeholder={t("form.sale_price.placeholder")}
//                   className="w-1/3 md:w-full max-w-[277px] md:max-w-full"
//                   register={register}
//                   dirtyFields={dirtyFields}
//                   Bgcolor="dark"
//                   withIcon={false}
//                   errors={errors}
//                   ServerErrors={
//                     ServerErrors?.response?.data?.errors?.sale_price?.[0]
//                   }
//                 />
//               )}
//               {(for_what === "for_rent" || for_what === "for_both") && (
//                 <NumberComponent
//                   setValue={setValue}
//                   t={t}
//                   name="rent_price"
//                   label={t("form.rent_price.label")}
//                   placeholder={t("form.rent_price.placeholder")}
//                   className="w-1/3 md:w-full max-w-[277px] md:max-w-full"
//                   register={register}
//                   dirtyFields={dirtyFields}
//                   Bgcolor="dark"
//                   withIcon={false}
//                   errors={errors}
//                   ServerErrors={
//                     ServerErrors?.response?.data?.errors?.rent_price?.[0]
//                   }
//                 />
//               )}
//               {for_what === "for_rent" && (
//                 <div className="flex w-1/3 md:w-full max-w-[277px] md:max-w-full flex-col items-start text-lg justify-center gap-2">
//                   {t("form.rent_duration.label")}
//                   <ComboBox
//                     selectBox
//                     setValue={setValue}
//                     data={RentDurationData}
//                     placeholder={t("form.rent_duration.placeholder")}
//                     stateName="rent_duration"
//                     light
//                   />
//                   {submitted && rent_duration === "" && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {t("form.rent_duration.err_msg")}
//                     </p>
//                   )}
//                   {
//                     //!--- server errors --------
//                     ServerErrors?.response?.data?.errors?.rent_duration && (
//                       <p className="pt-2 text-xs text-red-500">
//                         {
//                           ServerErrors?.response?.data?.errors
//                             ?.rent_duration?.[0]
//                         }
//                       </p>
//                     )
//                   }
//                 </div>
//               )}
//             </div>
//             {/** Rent Duration */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               {for_what === "for_both" && (
//                 <div className="flex w-1/3 md:w-full max-w-[277px] md:max-w-full flex-col items-start text-lg justify-center gap-2">
//                   {t("form.rent_duration.label")}
//                   <ComboBox
//                     selectBox
//                     setValue={setValue}
//                     data={RentDurationData}
//                     placeholder={t("form.rent_duration.placeholder")}
//                     stateName="rent_duration"
//                     light
//                   />
//                   {submitted && rent_duration === "" && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {t("form.rent_duration.err_msg")}
//                     </p>
//                   )}
//                   {
//                     //!--- server errors --------
//                     ServerErrors?.response?.data?.errors?.rent_duration && (
//                       <p className="pt-2 text-xs text-red-500">
//                         {
//                           ServerErrors?.response?.data?.errors
//                             ?.rent_duration?.[0]
//                         }
//                       </p>
//                     )
//                   }
//                 </div>
//               )}
//             </div>
//             <div className="SubmitProperty__separator w-5/6 h-[1px] bg-slate-300 mx-auto mt-4 mb-9"></div>
//             {/**
//              * //!------  Type Select ----------
//              */}
//             {/** purpose  & Category  &  priority   */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.purpose.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={PurposeData}
//                   placeholder={t("form.purpose.placeholder")}
//                   stateName="purpose"
//                   light
//                 />
//                 {submitted && purpose === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.purpose.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.purpose && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.purpose[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.category.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={categoriesData}
//                   placeholder={t("form.category.placeholder")}
//                   stateName="category"
//                   light
//                 />
//                 {submitted && category === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.category.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.category && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.category[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.priority.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={priorityData}
//                   placeholder={t("form.priority.placeholder")}
//                   stateName="priority"
//                   light
//                 />
//                 {submitted && priority === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.priority.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.priority && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.priority[0]}
//                     </p>
//                   )
//                 }
//               </div>
//             </div>
//             {/** country  & city  &  region   */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.country.label")}
//                 <ComboBox
//                   setValue={setValue}
//                   data={countriesData}
//                   placeholder={t("form.country.placeholder")}
//                   stateName={"country"}
//                   light
//                 />
//                 {submitted && country === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.country.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.country && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.country[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div
//                 className={`flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px] trns ${
//                   country
//                     ? "opacity-100 pointer-events-auto translate-y-0 md:block"
//                     : "opacity-0 pointer-events-none translate-y-3 md:hidden"
//                 }`}
//               >
//                 <>
//                   {t("form.city.label")}
//                   <ComboBox
//                     setValue={setValue}
//                     data={citiesData}
//                     placeholder={t("form.city.placeholder")}
//                     stateName="city"
//                     light
//                   />
//                 </>

//                 {submitted && city === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.city.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.city && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.city[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div
//                 className={`flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px] trns ${
//                   city
//                     ? "opacity-100 pointer-events-auto translate-y-0 md:block"
//                     : "opacity-0 pointer-events-none translate-y-3 md:hidden"
//                 }`}
//               >
//                 <>
//                   {t("form.region.label")}
//                   <ComboBox
//                     setValue={setValue}
//                     data={regionsData}
//                     placeholder={t("form.region.placeholder")}
//                     stateName="region"
//                     light
//                   />
//                 </>

//                 {submitted && region === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.region.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.region && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.region[0]}
//                     </p>
//                   )
//                 }
//               </div>
//             </div>
//             {/**  Property Type & finishing  &  Reception Floor Type   */}
//             <div className="flex w-full items-start justify-between gap-10 md:flex-col md:gap-1">
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.property_type.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={PropertyTypesData}
//                   placeholder={t("form.property_type.placeholder")}
//                   stateName="property_type"
//                   light
//                 />
//                 {submitted && property_type === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.property_type.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.property_type && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.property_type[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.finishing.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={PropertyFinishingData}
//                   placeholder={t("form.finishing.placeholder")}
//                   stateName="finishing"
//                   light
//                 />
//                 {submitted && finishing === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.finishing.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors?.finishing && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {ServerErrors?.response?.data?.errors?.finishing[0]}
//                     </p>
//                   )
//                 }
//               </div>
//               <div className="flex w-1/3 md:w-full flex-col items-start text-lg justify-start gap-2 h-[105px]">
//                 {t("form.reception_floor_type.label")}
//                 <ComboBox
//                   selectBox
//                   setValue={setValue}
//                   data={ReceptionFloorTypeData}
//                   placeholder={t("form.reception_floor_type.placeholder")}
//                   stateName="reception_floor_type"
//                   light
//                 />
//                 {submitted && reception_floor_type === "" && (
//                   <p className="pt-2 text-xs text-red-500">
//                     {t("form.reception_floor_type.err_msg")}
//                   </p>
//                 )}
//                 {
//                   //!--- server errors --------
//                   ServerErrors?.response?.data?.errors
//                     ?.reception_floor_type && (
//                     <p className="pt-2 text-xs text-red-500">
//                       {
//                         ServerErrors?.response?.data?.errors
//                           ?.reception_floor_type[0]
//                       }
//                     </p>
//                   )
//                 }
//               </div>
//             </div>
//             {/**
//              * //!------  primary image  & slider  ----------
//              */}
//             <HeadingUnderline className="text-2xl my-6 ">
//               {t("form.Photos_section_title")}
//             </HeadingUnderline>
//             <UploadFileComponent
//               register={register}
//               errors={errors}
//               ServerErrors={
//                 ServerErrors?.response?.data?.errors?.primary_image?.[0]
//               }
//               name="primary_image"
//               label={t("form.primary_image.label")}
//               btnText={t("form.primary_image.btnText")}
//               watch={watch}
//               t={t}
//               fileFor="property"
//             />
//             <div className="Property__sliders--drag--drop w-full mx-auto mt-7 ">
//               <DragDropArea setValue={setValue} t={t} />
//             </div>
//             <HeadingUnderline className="text-2xl my-6 ">
//               {t("form.property_description_en.Heading")}
//             </HeadingUnderline>
//             {/*  <TextEditor
//               setValue={setValue}
//               stateName="property_description_en"
//               watch={watch}
//               required_err_msg={t(
//                 "TextEditor.property_description_en.required_err_msg"
//               )}
//               placeholder={t("TextEditor.property_description_en.placeholder")}
//               ServerErrors={
//                 ServerErrors?.response?.data?.errors
//                   ?.property_description_en?.[0]
//               }
//             /> */}
//             <TextComponent
//               t={t}
//               register={register}
//               dirtyFields={dirtyFields}
//               Bgcolor="dark"
//               withIcon={false}
//               errors={errors}
//               ServerErrors={
//                 ServerErrors?.response?.data?.errors
//                   ?.property_description_en?.[0]
//               }
//               name="property_description_en"
//               //label={t("form.property_description_en.Heading")}
//               placeholder={t("form.property_description_en.Heading")}
//             />
//             <HeadingUnderline className="text-2xl my-6 ">
//               {t("form.property_description_ar.Heading")}
//             </HeadingUnderline>
//             <div className="Property__TextEditor w-full mx-auto ">
//               <TextComponent
//                 t={t}
//                 register={register}
//                 dirtyFields={dirtyFields}
//                 Bgcolor="dark"
//                 withIcon={false}
//                 errors={errors}
//                 ServerErrors={
//                   ServerErrors?.response?.data?.errors
//                     ?.property_description_ar?.[0]
//                 }
//                 name="property_description_ar"
//                 //label={t("form.property_description_ar.Heading")}
//                 placeholder={t("form.property_description_ar.Heading")}
//               />
//             </div>
//           </div>

//           <div className="bg-slate-300 w-full Property__Quick--Summary mt-5 pb-8 p-5 rounded-lg">
//             <div className="flex flex-col items-start gap-6 w-full  mx-auto ">
//               <HeadingUnderline className="text-2xl my-6 ">
//                 {t("form.Quick_Summary.Heading")}
//               </HeadingUnderline>
//               <div className="property__dynamic--fields w-full flex flex-col gap-4 ">
//                 {fields.map((field, index) => {
//                   return (
//                     <DynamicField
//                       key={field.id}
//                       register={register}
//                       dirtyFields={dirtyFields}
//                       Bgcolor="dark"
//                       withIcon={false}
//                       id={field.id as unknown as number}
//                       length={fields.length}
//                       callBkFn={() => {
//                         remove(index);
//                       }}
//                       errors={errors}
//                       ServerErrors={
//                         ServerErrors?.response?.data?.errors?.summary
//                       }
//                       index={index}
//                       t={t}
//                     />
//                   );
//                 })}
//                 <div className="w-full flex justify-center mt-6">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       append({ key: "", value: "" });
//                     }}
//                     className="bg-temp_secondary text-background border-2 w-fit px-3 py-2 rounded-md flex items-center justify-center gap-2 trns hover:text-temp_secondary hover:bg-transparent border-temp_secondary active:scale-90"
//                   >
//                     {t("form.Quick_Summary.add_btn_txt")}
//                     <FontAwesomeIcon className="" icon={faPlus} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/**
//            * //!------  aminities ----------
//            */}
//           <div className="bg-grey w-full Property__aminities mt-5 pb-6 sm:pb-0 min-h-[400px]">
//             <div className="flex flex-col items-start gap-6 w-full  mx-auto  ">
//               <HeadingUnderline className="text-2xl my-6 ">
//                 {t("form.aminities.Heading")}
//               </HeadingUnderline>
//               <ul className="property__aminities w-full grid grid-cols-3  md:grid-cols-2 sm:grid-cols-1 sm:px-1   gap-8 sm:h-[70vh] sm:overflow-y-auto text-temp_secondary">
//                 {PropertyaminitiesData?.map(
//                   (amenity: { id: number; title: string }, index: number) => (
//                     <CheckBox
//                       key={amenity.id}
//                       register={register}
//                       dirtyFields={dirtyFields}
//                       withIcon={false}
//                       name={`aminities.${index}`}
//                       label={amenity.title}
//                       value={amenity.id}
//                     />
//                   )
//                 )}
//               </ul>
//             </div>
//           </div>
//           <div className="w-full   mx-auto flex justify-between items-center md:flex-col md:gap-7 md:mt-5 ">
//             <Captcha
//               t={t}
//               refs={captchaRef}
//               setValue={setValue}
//               ServerError={
//                 ServerErrors?.response?.data?.errors?.not_ropot?.[0]
//                   ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
//                   : null
//               }
//             />
//             {/** Submit Button */}
//             <SubmitBtnComponent
//               disabled={!isValid || !allFieldsFilled || isPending}
//               isPending={isPending}
//               value={t("form.SubmitBtnComponent.value")}
//               className="!w-1/2 ss:!w-full  mx-auto"
//             />
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }
