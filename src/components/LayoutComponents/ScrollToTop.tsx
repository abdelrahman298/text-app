import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

function ScrollToTop() {
  const progress = useRef(null);
  const progressValue = useRef(null);
  const [showBtn, setShowBtn] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const pos = document.documentElement.scrollTop;
       const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollValue = Math.round((pos * 100) / calcHeight);
      setScrollPercentage(scrollValue); 
      if (pos > 150) {
        setShowBtn(true);
      } else setShowBtn(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      ref={progress}
      style={{
        background: `conic-gradient(#bed4de ${scrollPercentage}%,#edf3f8 ${scrollPercentage}%)`,
      }}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`${
        showBtn
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } group trns fixed right-5 bottom-16  p-1 shadow-lg shadow-secondary/30 w-12 flex-center  aspect-square rounded-full z-50`}
    >
      <span
        className="bg-grey w-full h-full rounded-full flex-center"
        ref={progressValue}
      >
        <FontAwesomeIcon
          className="text-xl group-hover:ScrollTo_top_btn"
          icon={faArrowUp}
        />
      </span>
    </button>
  );
}

export default ScrollToTop;
