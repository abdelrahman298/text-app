import {
  faCircleXmark,
  faCloudArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import React, { useState, useRef, useEffect } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type DragDropAreaProps<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  t: TFunction;
};
type imgType = {
  file: File;
  name: string;
  url: string;
  size?: number;
};
function DragDropArea<T extends FieldValues>({
  setValue,
  t,
}: DragDropAreaProps<T>) {
  const [validImages, setValidImages] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  function triggerFileInput() {
    fileInputRef?.current?.click();
  }
  useEffect(() => {
    const sliders: File[] = [];
    validImages.map((img: imgType) => sliders.push(img.file));
    setValue("sliders" as any, sliders as any);
  }, [setValue, validImages]);

  function handleSelectFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const Target = e.target as HTMLInputElement;
    const files = Target.files;
    //! case: if the user clicks the input then closes the window without selecting any files
    if (files?.length === 0) {
      return;
    }
    validate(files as FileList);
  }
  function validate(files: FileList) {
    for (const file of files) {
      //! case: if the image size exceeded the limit add it to the rejected images
      if (file.size > 5000000) {
        if (!rejectedImages.some((img: imgType) => img?.name === file?.name)) {
          setRejectedImages((prev) => [
            ...prev,
            { name: file.name, size: file.size },
          ]);
          setTimeout(() => {
            setRejectedImages([]);
          }, 5000);
        }
        continue;
      }
      //! case: if the file type is image only and  the item hasn't been already chosen
      if (
        file.type.split("/")[0] === "image" &&
        !validImages.some((img: imgType) => img?.name === file?.name)
      ) {
        setValidImages((prev) => [
          ...prev,
          { file: file, name: file.name, url: URL.createObjectURL(file) },
        ]);
      }
    }
  }

  function handleDeleteImg(index: number) {
    setValidImages((prev) => prev.filter((_, i) => i !== index));
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    validate(files);
  }
  return (
    <div className=" w-full h-fit  p-10 ss:px-4  bg-grey border-2 border-dashed  border-temp_secondary rounded-md overflow-hidden ">
      {/**
       * //! --- draggable__area ---
       */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="draggable__area flex flex-col items-center justify-center w-full  min-h-[220px]"
      >
        <FontAwesomeIcon className="text-6xl mb-6" icon={faCloudArrowUp} />
        {isDragging ? (
          <h3 className="text-lg"> {t("DragDropArea.title_while_dragging")}</h3>
        ) : (
          <>
            <h3 className="text-lg text-center">{t("DragDropArea.title")}</h3>
            <h4 className="my-5 text-lg font-medium">{t("DragDropArea.or")}</h4>
            <button
              onClick={triggerFileInput}
              className="relative bg-temp_secondary opacity20  px-3 py-1 text-lg rounded-md group text-background"
              type="button"
            >
              <span className="group-hover:opacity-0 duration-200">
                {t("DragDropArea.Browse")}
              </span>
              <FontAwesomeIcon
                className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 duration-200"
                icon={faPlus}
              />
            </button>
          </>
        )}
        <input
          className="hidden"
          type="file"
          id="sliders"
          accept="image/jpg, image/jpeg, image/png, image/webp"
          name="sliders"
          multiple
          //capture
          ref={fileInputRef}
          onChange={handleSelectFiles}
        />
      </div>

      {/**
       * //! --- validImages ---
       */}

      {validImages?.length > 0 && (
        <div className="images__preview grid grid-cols-3 w-full mt-10 justify-items-center gap-10 md:grid-cols-2 ss:grid-cols-1">
          {validImages.map((img: imgType, i) => (
            <div key={i} className="w-fit h-fit relative group">
              <img
                className="w-40 aspect-square object-cover rounded-md max-w-[160px]  max-h-[160px] group-hover:blur-[2px] duration-200 cursor-"
                src={img.url}
                alt={img.name}
              />
              <FontAwesomeIcon
                className="absolute top-3 right-3 cursor-pointer text-2xl"
                icon={faCircleXmark}
                onClick={() => handleDeleteImg(i)}
              />
            </div>
          ))}
        </div>
      )}

      {/**
       * //! --- rejectedImages ---
       */}

      {rejectedImages?.length > 0 && (
        <div className="rejected__images flex flex-col items-start gap-5 w-full mt-10">
          <p className="text-red-500 w-full text-center">
            {t("DragDropArea.rejectedImages.max_size_err_msg")}
          </p>
          {rejectedImages?.map((img: imgType, i) => (
            <div
              className="w-full flex justify-between gap-5 ss:gap-2 "
              key={i}
            >
              <p className="truncate w-1/2 ">{img.name}</p>
              <span className="text-red- min-w-fit">
                {t("DragDropArea.rejectedImages.size_txt")}{" "}
                {(img.size / 1000000).toFixed(1)}{" "}
                {t("DragDropArea.rejectedImages.size_unit")}
              </span>{" "}
              <span className="text-red-500">
                {t("DragDropArea.rejectedImages.Canceled")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DragDropArea;
