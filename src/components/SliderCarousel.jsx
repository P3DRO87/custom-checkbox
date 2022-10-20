import React, { useEffect, useRef, useState } from "react";
import SliderItem from "./SliderCarouselItem";

const initalSliderDimentions = { offsetXBounds: 0, sliderConW: 0, sliderW: 0 };

const SliderCarousel = ({ children, staticItemsSize = true }) => {
   const [isPressed, setIsPressed] = useState(false);
   const [isDragging, setIsDragging] = useState(false);
   const [startOffset, setStartOffset] = useState(0);
   const [offsetX, setOffsetX] = useState(0);
   const [sliderConW, setSliderConW] = useState(0);
   const [sliderDimentions, setSliderDimentions] = useState(initalSliderDimentions);
   const [isSliderControlClicked, setIsSliderControlClicked] = useState(false);
   const [isItemsOverflowing, setIsItemsOverflowing] = useState(false);
   const [nextOfst, setNextOfst] = useState(0);

   const sliderContainerRef = useRef();
   const silderRef = useRef();

   const handleMouseDown = (e) => {
      setIsSliderControlClicked(false);
      setIsPressed(true);

      const sliderBounds = e.currentTarget.getBoundingClientRect();
      const offsetXFromSlider = e.clientX || e.touches[0].pageX - sliderBounds.left;

      setStartOffset(offsetXFromSlider - offsetX);
   };

   const handleMouseMove = (e) => {
      if (!isPressed) return;

      if (!isItemsOverflowing) return setOffsetX(0);

      setIsDragging(true);

      const sliderBounds = e.currentTarget.getBoundingClientRect();
      const offsetXFromSlider = e.clientX || e.touches[0].pageX - sliderBounds.left;

      const nextOffsetX = offsetXFromSlider - startOffset;

      const { offsetXBounds } = sliderDimentions;

      setSliderConW(offsetXBounds);

      if (nextOffsetX > 0) return setOffsetX(0);

      if (nextOffsetX <= offsetXBounds) return setOffsetX(offsetXBounds);

      setOffsetX(nextOffsetX);
   };

   const handleMoveSliderLeft = () => {
      setIsSliderControlClicked(true);

      const { width } = sliderContainerRef.current.getBoundingClientRect();

      if (offsetX + width > 0) return setOffsetX(0);

      setOffsetX((prev) => prev + width);
   };

   const handleMoveSliderRight = (e) => {
      setIsSliderControlClicked(true);

      const { offsetXBounds, sliderConW } = sliderDimentions;

      if (offsetX - sliderConW <= offsetXBounds) return setOffsetX(offsetXBounds);

      setOffsetX((prev) => prev - sliderConW);
   };

   useEffect(() => {
      const handleMouseUp = () => {
         setIsPressed(false);
         setIsDragging(false);
      };

      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);

      return () => {
         window.removeEventListener("mouseup", handleMouseUp);
         window.removeEventListener("touchend", handleMouseUp);
      };
   }, []);

   useEffect(() => {
      const { width: sliderConW } = sliderContainerRef.current.getBoundingClientRect();
      const { width: sliderW } = silderRef.current.getBoundingClientRect();

      const offsetXBounds = sliderConW - sliderW;

      setSliderDimentions({ sliderConW, sliderW, offsetXBounds });
   }, [sliderContainerRef.current, silderRef.current]);

   useEffect(() => {
      if (!sliderContainerRef.current) return;

      const { offsetXBounds, sliderConW, sliderW } = sliderDimentions;

      setIsItemsOverflowing(sliderW > sliderConW);

      !(sliderW > sliderConW) && setOffsetX(0);

      setSliderConW(offsetXBounds);
   }, [sliderContainerRef, silderRef, sliderDimentions, children]);

   return (
      <div
         onMouseMove={handleMouseMove}
         onMouseDown={handleMouseDown}
         onTouchStart={handleMouseDown}
         onTouchMove={handleMouseMove}
         className="slider-carousel"
         ref={sliderContainerRef}
      >
         {offsetX < 0 && isItemsOverflowing && (
            <button
               onClick={handleMoveSliderLeft}
               className="slider-control prev-elements-btn"
            >
               {"<"}
            </button>
         )}
         <div
            onTransitionEnd={() => setIsSliderControlClicked(false)}
            style={{ transform: `translateX(${offsetX}px)` }}
            ref={silderRef}
            className={`slider${isDragging ? " active-drag" : ""}${
               isPressed ? " active-pressed" : ""
            }${isSliderControlClicked ? " active-clicked" : ""}`}
         >
            {children.map((item) => (
               <SliderItem staticItemsSize={staticItemsSize} key={item.key}>
                  {item}
               </SliderItem>
            ))}
         </div>
         {offsetX !== sliderConW && isItemsOverflowing && (
            <button
               onClick={handleMoveSliderRight}
               className="slider-control next-elements-btn"
            >
               {">"}
            </button>
         )}
      </div>
   );
};

export default SliderCarousel;
