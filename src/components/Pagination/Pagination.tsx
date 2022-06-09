import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './Pagination.scss';

type Props = {
  onPageChange: (val:number | string) => void,
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  className: string
}

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || (paginationRange as Array<any>).length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >

      <li
        className={classnames('pagination-item prev', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <span>Previous</span>

      </li>
      {paginationRange!.map(pageNumber => {

        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">{'. . .'}</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber!)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item next', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <span>Next</span>
      </li>
    </ul>
  );
};

export default Pagination