/** Dependencies */
import React from 'react'

/** Types */
import { LinksKeys } from '../../types/mockDataKeys';

/** Styles */
import './LinksList.scss';

/** Components */
import LinkCard from '../LinkCard/LinkCard';

type Props = {
    list: Array<Array<string>>;
}

const LinksList = ({ list }: Props) => {
  return (
    <div className="link-list">
        {
            list.map((linkItem) => (
                <LinkCard
                    nameSurname={linkItem[LinksKeys.NameSurname]}
                    city={linkItem[LinksKeys.City]}
                    company={linkItem[LinksKeys.Company]}
                    country={linkItem[LinksKeys.Country]}
                    date={linkItem[LinksKeys.Date]}
                />
            ))
        }
    </div>
  )
}

export default LinksList