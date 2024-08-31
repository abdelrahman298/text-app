import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { useAppSelector } from "@/app/reduxHooks";
import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
  Captcha,
  SubmitBtnComponent,
  TextComponent,
  PhoneComponent,
  ComboBox,
} from "@/components/FormComponents";
import {
  Heading,
  HelmetTags,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import VerificationCodeForm from "./VerificationCodeForm";
import { PasswordType } from "@/types";
import toast from "react-hot-toast";
import { lang } from "@/app/Features/MiscellaneousSlice";
import RadioInput from "@/components/FormComponents/RadioInput";
export type RegisterFormValues = {
  first_name: string;
  last_name: string;
  phone: number | string;
  email: string;
  password: PasswordType;
  confirm_password: PasswordType;
  birthday: string;
  gender: string;
  accept_condition: boolean | string;
  country: string;
  city: string;
  region: string;
  not_ropot: string;
  created_from: string;
  iam: string;
};

export function Component() {
  const { t, i18n } = useTranslation("Pages_Register");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_HomePage",
    `${import.meta.env.VITE_GET_SEO_DATA}/HomePage`
  );
  const [savedEmailBeforeReset, setSavedEmailBeforeReset] = useState("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const lng = useAppSelector(lang);

  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      birthday: "",
      gender: "",
      accept_condition: false,
      country: "",
      city: "",
      region: "",
      not_ropot: "no",
      created_from: "web",
      iam: "individual",
    },
  });

  const not_ropot = watch("not_ropot");
  const email = watch("email");
  const country = watch("country");
  const city = watch("city");
  const region = watch("region");
  const { data: countriesData } = useFetchData(
    "countries",
    import.meta.env.VITE_COUNTRIES_REGISTER,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  const { data: citiesData, refetch: refetchCities } = useFetchData(
    "cities",
    `${import.meta.env.VITE_CITIES_BASED_ON_COUNTRIES_REGISTER}${country}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!country
  );
  const { data: regionsData, refetch: refetchRegions } = useFetchData(
    "regions",
    `${import.meta.env.VITE_REGIONS_BASED_ON_CITIES_REGISTER}${city}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!city
  );
  const { mutate: sendVerificationCode } = usePostData(true);

  const {
    mutate: registerUser,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    setValue("not_ropot", "no");
    setSubmitted(false);
    sendVerificationCode({
      api: import.meta.env.VITE_SEND_CODE_TO_EMAIL,
      data: { operation_type: "verify_code", email: savedEmailBeforeReset },
    });
    setOpenAlertDialog(true);
    reset();
  });

  useEffect(() => {
    if (country !== "" && city !== "" && region !== "") {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [country, city, region]);

  useEffect(() => {
    if (country !== "") {
      refetchCities();
    }
  }, [country, refetchCities]);

  useEffect(() => {
    if (city !== "") {
      refetchRegions();
    }
  }, [city, refetchRegions]);

  const onSubmit = (data: RegisterFormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      setSubmitted(true);
      if (allFieldsFilled) {
        setSavedEmailBeforeReset(email);
        const finalData = {
          ...data,
          accept_condition: data.accept_condition === true ? "yes" : "no",
        };
        registerUser({
          api: import.meta.env.VITE_REGISTER_USER,
          data: finalData,
        });
      } else
        toast.error(
          lng === "ar"
            ? "برجاء ملئ جميع البيانات المطلوبة!"
            : "Please fill in all the required fields!"
        );
    }
  };

  const validateAge = (value: string) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18;
  };

  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent className="w-[500px] md:w-10/12 md:min-w-fit min-h-[500px] rounded-lg">
          <div className="dialog__VerificationCodeForm w-full h-full flex-col-center bg-slate-100 ">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-temp_secondary px-8 text-center">
                {t("VerificationCodeForm.heading_for_verify_account")}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <VerificationCodeForm
              email={savedEmailBeforeReset}
              setOpenAlertDialog={setOpenAlertDialog}
              t={t}
              from="register"
              operationType="verify_code"
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <section className="flex-center w-full min-h-screen bg-grey py-16">
        <HelmetTags
          title={t("tab.title")}
          description={SEO_DATA?.description || ""}
          keywords={SEO_DATA?.keywords || ""}
          canonical={`${i18n.language}/register`}
        />

        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="login__form  w-2/5 min-w-[650px] md:w-10/12 md:min-w-fit bg-background  border shadow-lg rounded-lg  p-8 flex-col-center "
        >
          <LangLink to="" className="logo  w-36 max-w-[144px] min-w-[144px] ">
            <img
              src="../assets/logo.png"
              //src={data?.logo}
              alt="Lana"
            />
          </LangLink>
          <Heading className="mt-8 mb-2">{t("heading")}</Heading>
          <SubHeading className="">{t("welcome_msg")}</SubHeading>

          <div className="loginForm_fields--wrapper flex flex-col items-start justify-start gap-2 w-full   mt-5">
            {/** First & Second Names  */}
            <div className="flex w-full items-start justify-between gap-16 lg:gap-10 md:flex-col  md:gap-2">
              {/** First Name  */}

              <TextComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="first_name"
                label={t("step_1.first_name.label")}
                placeholder={t("step_1.first_name.placeholder")}
                errors={errors}
                ServerErrors={
                  ServerErrors?.response?.data?.errors?.first_name?.[0]
                }
                confirmFor
              />

              {/** Second Name  */}

              <TextComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="last_name"
                label={t("step_1.last_name.label")}
                placeholder={t("step_1.last_name.placeholder")}
                errors={errors}
                ServerErrors={
                  ServerErrors?.response?.data?.errors?.last_name?.[0]
                }
                confirmFor
              />
            </div>
            {/** Phone & Email  */}
            <div className="flex w-full items-start justify-between gap-16 lg:gap-10 md:flex-col  md:gap-2">
              {/** Phone  */}
              <PhoneComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="phone"
                label={t("step_1.phone.label")}
                placeholder={t("step_1.phone.placeholder")}
                errors={errors}
                ServerErrors={ServerErrors?.response?.data?.errors?.phone?.[0]}
                confirmFor
              />

              {/** Email  */}
              <EmailComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="email"
                label={t("step_1.email.label")}
                placeholder={t("step_1.email.placeholder")}
                errors={errors}
                ServerErrors={ServerErrors?.response?.data?.errors?.email?.[0]}
                confirmFor
              />
            </div>
            {/** Passwords  */}
            <div className="flex w-full items-start justify-between gap-16 lg:gap-10 md:flex-col  md:gap-2">
              <PasswordComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="password"
                label={t("step_2.password.label")}
                placeholder={t("step_2.password.placeholder")}
                errors={errors}
                ServerErrors={
                  ServerErrors?.response?.data?.errors?.password?.[0]
                }
                confirmFor
              />
              {/** Confirm Password  */}
              <PasswordComponent
                t={t}
                register={register}
                dirtyFields={dirtyFields}
                name="confirm_password"
                label={t("step_2.confirm_password.label")}
                placeholder={t("step_2.confirm_password.placeholder")}
                errors={errors}
                ServerErrors={
                  ServerErrors?.response?.data?.errors?.confirm_password?.[0]
                }
                validations={{
                  validate: (value: PasswordType) =>
                    value === getValues("password"),
                }}
                confirmFor
              />
            </div>

            {/** Birthday & Gender */}
            <div className="flex w-full items-start justify-between gap-16 lg:gap-10 md:flex-col  md:gap-2">
              {/** Birthday  */}
              <label
                className=" flex bg w-1/2 md:w-full flex-col items-start justify-start gap-2  text-lg  h-[105px]"
                htmlFor="birthday"
              >
                {t("step_2.birthday.label")}
                <input
                  className="light-bg-inputs w-full pr-2 cursor-"
                  type="date"
                  id="birthday"
                  placeholder={t("step_2.birthday.placeholder")}
                  name="name"
                  min="1899-01-01"
                  max="2004-13-13"
                  autoComplete="on"
                  {...register("birthday", {
                    required: true,
                    validate: validateAge,
                  })}
                />
                {errors.birthday && (
                  <p className=" text-xs text-red-500">
                    {errors.birthday.type === "required" &&
                      t("step_2.birthday.validation_required")}
                    {errors.birthday.type === "validate" &&
                      t("step_2.birthday.validation_age")}
                  </p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors &&
                    ServerErrors?.response?.data?.errors?.birthday && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.birthday[0]}
                      </p>
                    )
                }
              </label>

              {/** Gender  */}
              <label className=" flex w-1/2 md:w-full flex-col items-start justify-start gap-2 text-lg   h-[105px]">
                {t("step_2.gender.label")}
                <div className="flex w-full min-h-[44px] items-center justify-between gap-6 ">
                  <RadioInput
                    register={register}
                    name="gender"
                    label={t("step_2.gender.male")}
                    id="male"
                    className="shadow-[0_0_0_1px] w-1/2 justify-start  shadow-temp_secondary h-full items-center px-3 rounded-sm"
                  />

                  <RadioInput
                    register={register}
                    name="gender"
                    label={t("step_2.gender.female")}
                    id="female"
                    className="shadow-[0_0_0_1px] w-1/2 justify-start  shadow-temp_secondary h-full items-center px-3 rounded-sm"
                  />
                </div>{" "}
                {errors.gender && (
                  <p className="pt- text-xs text-red-500">
                    {errors.gender.type === "required" &&
                      t("step_2.gender.validation_required")}
                  </p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors &&
                    ServerErrors?.response?.data?.errors?.gender && (
                      <p className="pt- text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.gender[0]}
                      </p>
                    )
                }
              </label>
            </div>
            {/** country & city & region */}
            <div className="flex w-full items-start justify-start gap-8 md:flex-col  md:gap-2 ">
              {/** Country  */}
              <label
                className=" flex w-1/3 md:w-full h-[105px]  text-lg  flex-col items-start justify-start gap-2  "
                htmlFor="country"
              >
                {t("step_3.Country.label")}
                <ComboBox
                  setValue={setValue}
                  data={countriesData}
                  placeholder={t("step_3.Country.placeholder")}
                  stateName={"country"}
                  NotFoundMessage={t("step_3.Country.NotFoundMessage")}
                />
                {submitted && country === "" && (
                  <p className="pt-2 text-xs text-red-500">
                    {t("step_3.Country.validation_required")}
                  </p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors?.response?.data?.errors?.country && (
                    <p className="pt-2 text-xs text-red-500">
                      {ServerErrors?.response?.data?.errors?.country[0]}
                    </p>
                  )
                }
              </label>
              {/** City  */}
              <label
                className={`flex w-1/3 md:w-full h-[105px]  text-lg flex-col items-start justify-start gap-2 trns ${
                  country
                    ? "opacity-100 pointer-events-auto translate-y-0 md:block"
                    : "opacity-0 pointer-events-none translate-y-3 md:hidden"
                } `}
                htmlFor="city"
              >
                {t("step_3.City.label")}
                <ComboBox
                  setValue={setValue}
                  data={citiesData}
                  placeholder={t("step_3.City.placeholder")}
                  stateName="city"
                  NotFoundMessage={t("step_3.City.NotFoundMessage")}
                />
                {submitted && city === "" && (
                  <p className="pt-2 text-xs text-red-500">
                    {t("step_3.City.validation_required")}
                  </p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors?.response?.data?.errors?.city && (
                    <p className="pt-2 text-xs text-red-500">
                      {ServerErrors?.response?.data?.errors?.city[0]}
                    </p>
                  )
                }
              </label>

              {/** Region  */}

              <label
                className={`flex w-1/3 md:w-full h-[105px]  text-lg flex-col items-start justify-start gap-2 trns ${
                  city
                    ? "opacity-100 pointer-events-auto translate-y-0 md:block"
                    : "opacity-0 pointer-events-none translate-y-3 md:hidden"
                }`}
                htmlFor="region"
              >
                {t("step_3.Region.label")}
                <ComboBox
                  setValue={setValue}
                  data={regionsData}
                  placeholder={t("step_3.Region.placeholder")}
                  stateName="region"
                  NotFoundMessage={t("step_3.Region.NotFoundMessage")}
                />
                {submitted && region === "" && (
                  <p className="pt-2 text-xs text-red-500">
                    {t("step_3.Region.validation_required")}
                  </p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors?.response?.data?.errors?.region && (
                    <p className="pt-2 text-xs text-red-500">
                      {ServerErrors?.response?.data?.errors?.region[0]}
                    </p>
                  )
                }
              </label>
            </div>

            {/** accept_condition  */}
            <div className=" flex  w-full flex-col items-start justify-start gap-2  min-h-[50px]">
              <CheckBox
                required
                register={register}
                name="accept_condition"
                label=""
                className="truncate px-0.5 xs:text-sm"
              >
                {t("step_4.terms.txt")}{" "}
                <LangLink
                  to="/terms-conditions"
                  className="font-medium underline underline-offset-4"
                  rel="noreferrer"
                  target={"_blank"}
                >
                  {t("step_4.terms.CTA")}
                </LangLink>{" "}
              </CheckBox>{" "}
              {errors.accept_condition && (
                <p className=" text-xs text-red-500">
                  {errors.accept_condition.type === "required" &&
                    t("step_4.terms.validation_required")}
                </p>
              )}
              {
                //!--- server errors --------
                ServerErrors &&
                  ServerErrors?.response?.data?.errors?.accept_condition && (
                    <p className=" text-xs text-red-500">
                      {
                        ServerErrors?.response?.data?.errors
                          ?.accept_condition[0]
                      }
                    </p>
                  )
              }
            </div>
            <Captcha
              t={t}
              id={33}
              refs={captchaRef}
              setValue={setValue}
              ServerError={
                ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                  ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                  : null
              }
            />
            {/** Submit Button */}
            <SubmitBtnComponent
              disabled={!isValid || !allFieldsFilled || isPending}
              isPending={isPending}
              value={t("step_4.SubmitBtnComponent.value")}
              className="mt-0"
            />
            <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 text-temp_secondary">
              {t("form__bottom.providers.have_an_account")}
              <LangLink
                to="/login"
                className="font-bold text-base cursor-pointer"
              >
                {t("form__bottom.providers.Login")}
              </LangLink>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
