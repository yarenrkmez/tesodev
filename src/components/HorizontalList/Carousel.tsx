/** Dependencies */
import React, { useEffect, useState } from "react";

/** Images and Icons */
import { leftIcon, rightIcon } from "../../assets/icons";
import { horizontalMockImg } from "../../assets/images";

/** Styles */
import "./Carousel.scss";

export const CarouselItem = ({ children, width }: any) => {
  return (
    <div className="carousel-container__carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Cart = () => {

  return (
    <div
      className="cart-container"
    >
      <img
        className="cart-container__img"
        src={horizontalMockImg} />

      <span className="cart-container__header">
        A Plan to Rebuild the Bus Terminal Everyone Loves to Hate
      </span>

      <span className="cart-container__header-sub">1h ago · by Troy Corlson</span>
    </div>
  )
}

const Carousel = ({ children }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: any) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div>
      <h2 className="coursel-header">Top News</h2>

      <div className="carousel-container">

        <img
          className='carousel-container__icon'
          src={leftIcon}
          onClick={() => updateIndex(activeIndex - 1)}
        />

        <div className="carousel-container__list">
          <div
            className="carousel-container__inner"
            style={{ transform: `translateX(-${activeIndex * 25}%)` }}
          >
            {React.Children.map(children, (child, index) => {

              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  {[...Array(12)].map((e, i) =>
                    <Cart />

                  )}
                </div>)

            })}
          </div>
        </div>

        <img
          className='carousel-container__icon'
          src={rightIcon}
          onClick={() => updateIndex(activeIndex + 1)}
        />
      </div>
    </div>

  );
};

export default Carousel;
