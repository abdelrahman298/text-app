import { FormEvent } from "react";
import { useRef } from "react";

import {
  toggleLogOutPopUp as toggleLogOutPopUpREdux,
  setToggleLogOutPopUp,
} from "@/app/Features/MiscellaneousSlice.tsx";
import SubmitBtnComponent from "../FormComponents/SubmitBtnComponent.jsx";

import { useHandleLogOut } from "../../Utilities/index.ts";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";
import { TFunction } from "i18next";

function LogOutPopUp({ t }: { t: TFunction }) {
  const toggleLogOutPopUp = useAppSelector(toggleLogOutPopUpREdux);
  const LogOutOfferPopUpContent = useRef<HTMLFormElement>(null);
  const dispatchRedux = useAppDispatch();

  const [logOut, isPending] = useHandleLogOut();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    logOut();
  };

  return (
    <section
      onClick={(e) => {
        if (
          !LogOutOfferPopUpContent?.current?.contains(
            e.target as HTMLFormElement
          )
        ) {
          dispatchRedux(setToggleLogOutPopUp(false));
        }
      }}
      className={`w-full h-screen ${
        toggleLogOutPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex-center">
        <div className="LogOutOfferPopUp__absolute absolute h-full w-full bg-temp_secondary opacity-40"></div>

        <form
          ref={LogOutOfferPopUpContent}
          method="post"
          onSubmit={onSubmit}
          className={`form  w-1/2 ss:w-11/12 bg-grey flex flex-col justify-start  gap-6 ${
            toggleLogOutPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg p-9 rounded-md`}
        >
          <h2 className="text-2xl font-medium w-full text-center">
            {t("LogOutPopUp.LogOutPopUpTitle")}
          </h2>

          {/** Submit Button */}
          <div className="w-full flex justify-between items-center mt-5">
            <button
              type="button"
              onClick={() => {
                dispatchRedux(setToggleLogOutPopUp(false));
              }}
              className={`  group  rounded-md w-24 h-11 trns bg-red-600 text-background  hover:bg-transparent border-red-600 border-2 hover:text-red-600 active:scale-90 flex items-center justify-center  `}
            >
              {t("LogOutPopUp.CancelBtnText")}
            </button>
            <SubmitBtnComponent
              disabled={isPending}
              isPending={isPending}
              value={t("LogOutPopUp.SubmitBtnText")}
              className={"!w-28 mt-0"}
              alignment={"horizontal"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default LogOutPopUp;
