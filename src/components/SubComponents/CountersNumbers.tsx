import { useEffect, useRef } from "react";
import { ICounterData } from "@/types/CardsTypes";
import { useExternalData } from "@/Hooks/useAxios";
import bed from "./../../../public/assets/bed.png";
import diag from "./../../../public/assets/diag.png";
import location from "./../../../public/assets/location.png";
import tower from "./../../../public/assets/tower.png";
import { defaultData } from "../../../src/Utilities/style.js";

const counterImages = [bed, diag, tower, location];
export default function CountersNumbers({
  countersData,
}: {
  countersData: ICounterData[];
}) {
  const section = useRef<HTMLDivElement>(null);

  function startCount(el: HTMLElement) {
    const goal = el.dataset.goal as unknown as number;
    const count = setInterval(() => {
      let textContent = el.textContent as any;
      textContent++;
      if (textContent == goal) {
        clearInterval(count);
      }
    }, 2000 / goal);
  }
  useEffect(() => {
    const nums = document.querySelectorAll(".nums .num");
    let started = false; // Function Started ? No

    const handleScroll = () => {
      const rect = section.current.getBoundingClientRect();
      const elementTopFromViewportTop = rect.top;
      if (elementTopFromViewportTop < 550) {
        if (!started) {
          nums.forEach((num) => startCount(num as HTMLElement));
        }
        started = true;
      }

      console.log(elementTopFromViewportTop);
    };
    if (section?.current && countersData) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [countersData]);

  const { data: externalData } = useExternalData();

  return (
    <div
      ref={section}
      className="w-full h-44 lg:h-64 sm:h-[470px] flex-center bg-background shadow-lg border rounded-md "
    >
      <div className="w-full h-fit nums   grid grid-cols-4 lg:grid-cols-2 lg:gap-y-8 sm:gap-y-0 sm:grid-cols-1 divide-x justifyitems-start   rtl:divide-x-reverse sm:divide-x-0 sm:divide-y ">
        {countersData?.map((counter) => (
          <div className="1st__counter flex  justify-center items-center gap-5  sm:py-4">
            <img
              src={counterImages[0]}
              alt={counter?.title}
              className="w-[50px] aspect-square object-cover "
            />
            <div>
              <h3
                style={{
                  color:
                    defaultData.color.basic_color &&
                    defaultData.color.basic_color,
                }}
                data-goal={counter?.number.toLocaleString("en-US")}
                className="1st__counter--number num text-5xl font-bold text-temp_secondary"
              >
                0
              </h3>
              <h4
                style={{
                  color:
                    defaultData.color.basic_color &&
                    defaultData.color.basic_color,
                }}
                className="1st__counter--text mt-2 text-temp_secondary opacity-70"
              >
                {counter?.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
