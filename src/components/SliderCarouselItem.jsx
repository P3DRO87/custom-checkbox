import React, { useEffect, useRef, useState } from "react";

const SliderItem = ({ children, staticItemsSize }) => {
   const [sliderWidth, setSliderWidth] = useState("");

   const sliderItemRef = useRef();

   useEffect(() => {
      if (!sliderItemRef.current) return;

      const sliderItem = sliderItemRef.current;

      const sliderCon = sliderItem.parentElement.parentElement; //

      const slider = sliderItem.parentElement;

      const sliderGap = getComputedStyle(slider).getPropertyValue("column-gap");

      const sliderGapNumVal = parseFloat(sliderGap) || 0;

      const { width } = sliderCon.getBoundingClientRect();

      const sliderItemsL = slider.querySelectorAll(`.${sliderItem.className}`).length;

      setSliderWidth((width * 2 + sliderGapNumVal) / sliderItemsL - sliderGapNumVal);
   }, [sliderItemRef, children]);

   return (
      <div
         style={{ width: `${!staticItemsSize ? sliderWidth : ""}px` }}
         ref={sliderItemRef}
         className={`slider-item${staticItemsSize ? " static-size" : ""}`}
      >
         {children}
      </div>
   );
};

export default SliderItem;
