import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { sliderData } from '../assets/data/sliderData';

const SliderWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background: rgba(255, 192, 203, 0.2);

  @media screen and (max-width: 414px) {
    margin-left: 0px;
  }
`;

const SliderItem = styled.div`
  img {
    width: 120%;
    height: 100%;
    margin-top: 8vw;
    border-radius: 30px;
    object-fit: cover;
    box-shadow: 10px 10px 10px #c0c0c0;

    @media screen and (max-width: 1024px) {
      width: 115%;
      height: 100%;
      margin-top: 50px;
    }
  }
`;

const ImageSlider = styled.div`
  background: #fff;
  height: 100%;
  width: 80%;
  padding-left: 70px;
  padding-right: 10px;
  border-radius: 0 40% 40% 0;

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
  }

  @media screen and (max-width: 414px) {
    padding-left: 30px;
  }
`;

const Slider = () => {
  const [current, setCurrnet] = useState(0);
  const length = sliderData.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrnet((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout, current);
      }
    };
  }, [current, length]);

  return (
    <SliderWrapper>
      <ImageSlider>
        {sliderData.map((item, index) => (
          <SliderItem
            key={index}
            className={index === current ? 'slide active' : 'slide'}
          >
            {index === current && <img src={item.image} alt={item.alt} />}
          </SliderItem>
        ))}
      </ImageSlider>
    </SliderWrapper>
  );
};

export default Slider;
