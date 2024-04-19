import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Grid } from "@mui/material";
import { useState } from "react";

export default () => {
  const numberOfSlides = Array.from({ length: 5 });
  const slideContent = [
    "Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    "Step 2: Lorem ipsum dolor sit amet",
    "Step 3: Lorem ipsum dolor sit amet",
    "Step 4: Lorem ipsum ",
    "Step 5: Lorem ipsum dolor sit amet",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwiperIndexChange = (swiper: any) => {
    console.log("swiper.activeIndex", swiper.activeIndex);
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      // loop={true}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: -1,
      }}
      // pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
      onSlideChange={(swiper: any) => handleSwiperIndexChange(swiper)}
    >
      {numberOfSlides.map((_, index) => (
        <SwiperSlide className="">
          <Grid
            direction="column"
            className=" flex justify-center items-center  "
          >
            <img
              src={`/assets/images/howItWorks/img_${index + 1}.png`}
              alt="slide_image"
              className="w-[70%] h-[67%] bg-orange-500"
            />
            {activeIndex === index ? (
              <div className="font-Dhurjati font-normal text-center text-base leading-[1.5] mt-6">
                {slideContent[index]}
              </div>
            ) : (
              ""
            )}
          </Grid>
        </SwiperSlide>
      ))}

      <div className="slider-controler">
        <div
          className="swiper-button-prev slider-arrow"
          style={{ display: `${activeIndex === 0 ? "none" : "block"}` }}
        ></div>

        <div
          className="swiper-button-next slider-arrow"
          style={{
            display: `${
              activeIndex === numberOfSlides.length - 1 ? "none" : "block"
            }`,
          }}
        ></div>
      </div>
    </Swiper>
  );
};
