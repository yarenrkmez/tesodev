/** Dependencies */
import React from 'react'
/**Components */
import Footer from '../../components/Footer/Footer';
import Search from '../../components/Search/Search'
import Carousel, { CarouselItem } from '../../components/HorizontalList/Carousel';

/** Style */
import './HomePage.scss';
/** Images */
import { tesodevLogo, footerImg } from '../../assets/images';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigator = useNavigate();
  return (
    <div className="home-page">
      <div className="home-page__header">
        <Button
          className="home-page__search-container__button"
          title='Add new record'
          onClick={()=>navigator('/add-link')}
        />

      </div>

      <div className="home-page__search-container">
        <div className="home-page__logo-container">
          <img src={tesodevLogo} alt="tesodevLogo" />
          <span className="home-page__logo-text">search app</span>
        </div>
        <Search />
      </div>

      <Carousel>
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </Carousel>

      <Footer />
    </div>
  )
}

export default HomePage