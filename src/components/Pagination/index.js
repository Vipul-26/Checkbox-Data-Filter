import React, { useState, useEffect } from 'react';
import './pagination.css';
import { ReactComponent as ButtonArrow } from '../../icons/arrow.svg';

const Pagination = () => {

    const totalRecords = 80;
    // const router = useRouter();
    const [totalPages, setTotalPages] = useState(0);
    // const currentPageNo = parseInt(router?.query?.detail?.[2]) || 1;
    const currentPageNo = 1;
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / 12));
    }, [setTotalPages, totalRecords]);

    const createPaginationLinks = (currentPage, totalPages) => {
        const paginationArray = [];
        let countOfDotItems = 0;
        if (!totalPages && 1 >= totalPages) {
            return paginationArray.push(currentPageNo);
        }
        if (0 < currentPage - 2) {
            paginationArray.push(currentPage - 2);
        }
        if (0 < currentPage - 1) {
            paginationArray.push(currentPage - 1);
        }
        paginationArray.push(currentPage);
        if (totalPages >= currentPage + 1) {
            paginationArray.push(currentPage + 1);
        }
        if (totalPages >= currentPage + 2) {
            paginationArray.push(currentPage + 2);
        }
        if (1 < paginationArray[0] - 1) {
            paginationArray.unshift('...');
            countOfDotItems += 1;
        }
        if (2 < totalPages - paginationArray[paginationArray.length - (2 - countOfDotItems)]) {
            paginationArray.push('...');
        }
        if (-1 === paginationArray.indexOf(1)) {
            paginationArray.unshift(1);
        }
        if (-1 === paginationArray.indexOf(totalPages)) {
            paginationArray.push(totalPages);
        }
        return paginationArray;
    };

    const rangeData = totalPages ? createPaginationLinks(currentPageNo, totalPages) : [];
    const prevDisabled = currentPageNo === 1 ? 'disabled' : '';
    const nextDisabled = currentPageNo === totalPages ? 'disabled' : '';

    return (
        <div>
            {width < 1279 ?
                <div className='mobPaginationMainDiv'>
                    <a href='/' className={`paginationPrevNext ${prevDisabled}`}>
                        <ButtonArrow height='17px' width='17px' className='prevArrow' />
                        Back
                    </a>
                    <div className='mobPagination'>
                        <div>{`${currentPageNo}/${totalPages}`}</div>
                    </div>
                    <a href='/' className={`paginationPrevNext ${nextDisabled}`}>
                        Next
                        <ButtonArrow height='17px' width='17px' className='nextArrow' />
                    </a>
                </div>
                :
                <div className='dskPagination'>
                    <a href='/' className='paginationPrevNext prevDisabled'>
                        <ButtonArrow height='17px' width='17px' className='prevArrow' />
                        Back
                    </a>
                    {rangeData?.map(index => {
                        const activeClass = currentPageNo === index ? 'currentPage' : 'normalPage';
                        return typeof index === 'number' ? (
                            <a href='/' className={`${activeClass}`}>
                                {index}
                            </a>
                        ) : (
                            <span key={`id-${index}`} className='normalPage'>
                                {index}
                            </span>
                        );
                    })}
                    <a href='/' className='paginationPrevNext nextDisabled'>
                        Next
                        <ButtonArrow height='17px' width='17px' className='nextArrow' />
                    </a>
                </div>
            }
        </div >
    );
};

export default Pagination;