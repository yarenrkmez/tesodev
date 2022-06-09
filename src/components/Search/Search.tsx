/** Dependencies */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

/**Components */
import Button from '../Button/Button';
import Input from '../Input/Input';

/** Services */
import linksServices from '../../services/linksServices';

/** Types */
import { LinksKeys } from '../../types/mockDataKeys';

/** Styles */
import './Search.scss';

/** Icons */
import { locationIcon, searchIcon } from '../../assets/icons';

type Props = {
    titleVisibility?: boolean;
    iconVisibility?: boolean;
    searchValue?: string;
    getSearchValue?: (val: string) => void
}

const Search = ({ titleVisibility, iconVisibility, searchValue, getSearchValue }: Props) => {
    const [result, setResult] = useState<Array<Array<string>>>([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    const currentLocation = useLocation();

    const redirectResultPage = () => {
        if (search) {
            navigate(`/result-page?search=${search}`);

            if (currentLocation.pathname.includes('result-page')) {
                window.location.reload();
            }
        }

    }

    return (
        <div className='search-body'>
            {
                titleVisibility && (
                    <h3>Find In Records</h3>
                )
            }
            <div className='search-body__search-bar'>
                <Input
                    inputProps={{
                        type: "text",
                        onChange: (e) => {
                            const value = e.target.value;
                            setSearch(value);
                            getSearchValue?.(value);

                            if (value) {
                                if (!searchValue) {
                                    setResult(linksServices.getLinks(e.target.value, 1, 3));
                                }
                            } else {
                                setResult([]);
                            }
                        }
                    }}
                    iconImage={iconVisibility && searchIcon}
                />
                <Button
                    title='Search'
                    className='search-body__search-bar-button'
                    onClick={() => redirectResultPage()}
                />
            </div>
            {
                result.length > 0 && (
                    <div className="search-body__search-result-popup">
                        {
                            result.map((linkItem) => (
                                <div className="search-popup-item">
                                    <img src={locationIcon} className="search-popup-item__icon" alt="locationIcon" />
                                    <div className="search-popup-item__content">
                                        <span className="search-popup-item__title">{linkItem[LinksKeys.City]}</span>
                                        <span className="search-popup-item__desc">{linkItem[LinksKeys.Company]}</span>
                                    </div>
                                </div>
                            ))
                        }
                        <span className="search-body__show-more-button" onClick={redirectResultPage}>Show more...</span>
                    </div>
                )
            }
        </div>
    )
}

export default Search