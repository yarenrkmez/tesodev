/** Dependencies */
import React from 'react'

/** Styles */
import './LinkCards.scss';

/** Components */
import { locationIcon } from '../../assets/icons';

type Props = {
  nameSurname: string;
  date: string;
  company: string;
  city: string;
  country: string;
}

const LinkCard = ({
  city,
  company,
  country,
  date,
  nameSurname
}: Props) => {
  return (
    <div className="link-card">
      <div className="link-card__container">
        <div className="link-card__location-container">
          <img src={locationIcon} alt="locationIcon" />
          <div className="link-card__location">
            <span className="link-card__company">{company}</span>
            <span className="link-card__address">{country} {city}</span>
          </div>
        </div>
        <div className="link-card__person-container">
          <span className="link-card__name-surname">{nameSurname}</span>
          <span className="link-card__date">{date}</span>
        </div>
      </div>
    </div>
  )
}

export default LinkCard