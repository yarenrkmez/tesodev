/** Dependencies */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

/** Styles */
import './ResultPage.scss';

/** Components */
import LinksList from '../../components/LinksList/LinksList'
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import Button from '../../components/Button/Button';

/** Hooks */
import useClickOutside from '../../hooks/useClickOutside';

/** Images and Icons */
import { tesodevLogo } from '../../assets/images';
import { orderByIcon } from '../../assets/icons';

/** Services */
import linksServices from '../../services/linksServices';
import { orderByEnum } from '../../enum';
import classNames from 'classnames';


let PageSize = 5;

const ResultPage = (props: any) => {
  const [result, setResult] = useState<Array<Array<string>>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [visibilityPopup, setVisibilityPopup] = useState(false);
  const [orderBy, setOrderBy] = useState('YEAR_DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const currentTableData = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const searchParams = params.get('search');
    let resultList;
    if (searchParams) {
      resultList = linksServices.getLinks(searchParams, currentPage, 5, orderBy as any);
    }
    return resultList;
  }, [currentPage, orderBy]);


  //ref
  const popupRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  //hook
  useClickOutside(popupRef as any, (val) => setVisibilityPopup(val), visibilityPopup);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParams = params.get('search');

    if (searchParams) {
      const resultList = linksServices.getLinks(searchParams, 1, 5, orderBy as any);
      setSearchValue(searchParams);
      setResult(resultList);
      const { totalData, totalPage } = linksServices.getTotalLinks(searchParams, 5);
      setTotal(totalData);
    }
  }, []);


  return (
    <div className="result-page">
      <div className="result-page-header">
        <div className="result-page-header__search-content">
          <img className="add-link-header__logo" src={tesodevLogo} />
          <Search
            titleVisibility={false}
            iconVisibility={false}
            // searchValue={searchValue}
            // getSearchValue={(val: string) => navigate(`/result-page?search=${val}`)}
          />
        </div>
        <Button 
        title="Add new record" 
        onClick={()=>navigate('/add-link')}
        />
      </div>
      <div className="result-page__link-list-container">
        <LinksList list={currentTableData!} />

        <div
          className='order-by-container'
          ref={popupRef}
        >
          <Button
            title='Order By'
            iconName={orderByIcon}
            className='order-by-container__button'
            onClick={() => setVisibilityPopup(!visibilityPopup)}
          />
          {visibilityPopup &&
            <div
              className='order-by-container__popup'
            >
              <span
                className={classNames('order-by-container__popup__item',
                  { 'order-by-container__popup__item--active': orderBy === 'NAME_ASC' }
                )}
                onClick={() => {
                  setVisibilityPopup(false);
                  setOrderBy('NAME_ASC');
                }}
              >
                Name ascending
              </span>

              <span
                className={classNames('order-by-container__popup__item',
                  { 'order-by-container__popup__item--active': orderBy === 'NAME_DESC' }
                )}
                onClick={() => {
                  setVisibilityPopup(false);
                  setOrderBy('NAME_DESC');
                }}
              >
                Name descending
              </span>

              <span
                className={classNames('order-by-container__popup__item',
                  { 'order-by-container__popup__item--active': orderBy === 'YEAR_ASC' }
                )}
                onClick={() => {
                  setVisibilityPopup(false);
                  setOrderBy('YEAR_ASC');
                }}              >
                Year ascending
              </span>

              <span
                className={classNames('order-by-container__popup__item',
                  { 'order-by-container__popup__item--active': orderBy === 'YEAR_DESC' }
                )}
                onClick={() => {
                  setVisibilityPopup(false);
                  setOrderBy('YEAR_DESC');
                }}
              >
                Year descending
              </span>
            </div>
          }
        </div>


      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={total}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page as number)}
      />
    </div>
  )
}

export default ResultPage