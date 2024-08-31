import { usePostData } from "@/Hooks/useAxios";
import {
  DeletedItem as DeletedItemREdux,
  setDeletedItem,
  setToggleDeletePopUp,
  toggleDeletePopUp as toggleDeletePopUpREdux,
} from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { FormEvent, useRef } from "react";
import { TFunction } from "i18next";
import { SubmitBtnComponent } from "../FormComponents";

type DeletePopUpProps = { api: string; onSuccess: () => void; t: TFunction };
function DeletePopUp({ api, onSuccess, t }: DeletePopUpProps) {
  const toggleDeletePopUp = useAppSelector(toggleDeletePopUpREdux);
  const DeletedItem = useAppSelector(DeletedItemREdux);
  const DeleteOfferPopUpContent = useRef<HTMLFormElement>(null);
  const dispatchRedux = useAppDispatch();

  const { mutate, isPending } = usePostData(true, () => {
    dispatchRedux(setToggleDeletePopUp(false));
    dispatchRedux(setDeletedItem(null));

    onSuccess && onSuccess();
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ api: api, data: { property_id: DeletedItem } });
  };
  return (
    <section
      onClick={(e) => {
        if (
          !DeleteOfferPopUpContent?.current?.contains(
            e.target as HTMLFormElement
          )
        ) {
          dispatchRedux(setToggleDeletePopUp(false));
          dispatchRedux(setDeletedItem(null));
        }
      }}
      className={`w-full h-screen ${
        toggleDeletePopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="DeleteOfferPopUp__absolute absolute h-full w-full bg-temp_secondary opacity-40"></div>

        <form
          ref={DeleteOfferPopUpContent}
          method="post"
          onSubmit={onSubmit}
          className={`add__comment--form  w-1/2 ss:w-11/12 bg-grey flex flex-col justify-start  gap-6 ${
            toggleDeletePopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg p-9 round`}
        >
          <h2 className="text-2xl font-medium w-full text-center">
            {t("DeletePopUp.DeletePopUpTitle")}
          </h2>

          {/** Submit Button */}
          <div className="w-full flex justify-between items-center mt-5">
            <button
              type="button"
              onClick={() => {
                dispatchRedux(setToggleDeletePopUp(false));
                dispatchRedux(setDeletedItem(null));
              }}
              className={`  group  round w-24 h-10 trns bg-red-600 text-background  hover:bg-transparent border-red-600 border-2 hover:text-red-600 active:scale-90 flex items-center justify-center  `}
            >
              {t("DeletePopUp.CancelBtnText")}
            </button>
            <SubmitBtnComponent
              disabled={isPending}
              isPending={isPending}
              value={t("DeletePopUp.SubmitBtnText")}
              className={"!w-28 mt-0"}
              alignment={"horizontal"}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default DeletePopUp;
