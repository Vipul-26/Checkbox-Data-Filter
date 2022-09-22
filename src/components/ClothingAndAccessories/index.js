import React, { useState, useMemo } from "react";
import Card from "../Card";
import "./clothing.css";
import Data from "../../data.json";
import filterImage from '../../images/logo/filter.png';
import Modal from "../Modal";
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import Pagination from "../Pagination";
import OutsideClickHandler from 'react-outside-click-handler';

const array = [...Data];

const ClothingAndAccessories = () => {

  let [sort, setSort] = useState(false);
  let [perPage, setPerPage] = useState(false);

  let [sortText, setSortText] = useState("Sort By Price");
  let [perPageValue, setperPageValue] = useState(12);
  let [arr, setArr] = useState([...array.slice(0, perPageValue)]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategory, setCategory] = useState(false);
  const [isRating, setRating] = useState(false);

  const categoryItems = [...new Set(array.map((data) => data && data.category)),]
    .map((category) => {
      return { name: category, applied: false };
    });

  let [category_items, setCategoryItems] = useState([...categoryItems]);

  const ratingItems = [4, 3, 2, 1].map((rating) => {
    return { name: `${rating}★ & above`, applied: false };
  });

  let [rating_items, setRatingsItems] = useState([...ratingItems]);

  const [fillProd, setFillProd] = useState(array.length);

  let [firstPage, setFirstPage] = useState(1);
  let [lastPage, setLastPage] = useState(12);

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * perPageValue;
    setFirstPage(firstPageIndex + 1);
    const lastPageIndex = firstPageIndex + parseInt(perPageValue);
    setLastPage(lastPageIndex);
    if (isCategory || isRating) {
      const filteredCategories = category_items.filter(
        (item) => item.applied === true
      );

      const filteredRatings = rating_items.filter(
        (item) => item.applied === true
      );

      let minRating = 0;
      if (filteredRatings.length) {
        minRating = Math.min(
          ...filteredRatings.map((item) => item.name.split("★")[0])
        );
      }

      if (filteredCategories.length) {
        const categories = filteredCategories.map((item) => item.name);
        const filteredProducts = array.filter(
          (product) => categories.includes(product.category) && product.rating >= minRating
        );
        setArr([...filteredProducts.slice(firstPageIndex, lastPageIndex)])
      }
      else {
        const filteredProducts = array.filter(
          (product) => product.rating >= minRating
        );
        setArr([...filteredProducts.slice(firstPageIndex, lastPageIndex)])
      }
    }
    else {
      setArr(array.slice(firstPageIndex, lastPageIndex));
    }
  }, [currentPage, category_items, isCategory, isRating, perPageValue, rating_items]);

  const [isOpen, toggleModal] = useState(false);

  const handleModal = () => {
    toggleModal(true);
  };

  const myFun = () => {
    toggleModal(false);
  };

  const handleApply = () => {
    setTimeout(myFun, 500);
  };

  const handleClear = () => {
    setCurrentPage(1);
    const category = category_items;
    category.forEach((item) => (item.applied = false));
    setCategoryItems(category);
    const rating = rating_items;
    rating.forEach((item) => (item.applied = false));
    setRatingsItems(rating);
    setArr([...array.slice(0, perPageValue)]);
  };

  const handleFilter = (id, index) => {
    setCurrentPage(1);
    if (id === 1) {
      setCategory(true);
      const category = category_items;
      category[index].applied = !category[index].applied;
      setCategoryItems(category);
    }

    else if (id === 2) {
      setRating(true);
      const rating = rating_items;
      rating[index].applied = !rating[index].applied;
      setRatingsItems(rating);
    }

    const filteredCategories = category_items.filter(
      (item) => item.applied === true
    );

    const filteredRatings = rating_items.filter(
      (item) => item.applied === true
    );

    let minRating = 0;
    if (filteredRatings.length) {
      minRating = Math.min(
        ...filteredRatings.map((item) => item.name.split("★")[0])
      );
    }

    if (filteredCategories.length) {
      const categories = filteredCategories.map((item) => item.name);
      const filteredProducts = array.filter(
        (product) => categories.includes(product.category) && product.rating >= minRating
      );
      setFillProd(filteredProducts.length);
      setArr([...filteredProducts.slice(0, perPageValue)])
    }
    else {
      const filteredProducts = array.filter(
        (product) => product.rating >= minRating
      );
      setFillProd(filteredProducts.length);
      setArr([...filteredProducts.slice(0, perPageValue)])
    }
  };

  const handleSort = () => {
    setSort(!sort);
    setPerPage(false);
  };

  const handlePerPage = () => {
    setPerPage(!perPage);
    setSort(false);
  };

  const handleSortText = (e) => {
    setCurrentPage(1);
    setSortText(e.target.value);
    setSort(false);
    if (isCategory || isRating) {
      const filteredCategories = category_items.filter(
        (item) => item.applied === true
      );

      const filteredRatings = rating_items.filter(
        (item) => item.applied === true
      );

      if (e.target.value === 'Price - Low to High') {
        setArr(array.sort((a, b) => a.price - b.price));
      }
      else if (e.target.value === 'Price - High to Low') {
        setArr(array.sort((a, b) => b.price - a.price));
      }

      let minRating = 0;
      if (filteredRatings.length) {
        minRating = Math.min(
          ...filteredRatings.map((item) => item.name.split("★")[0])
        );
      }

      if (filteredCategories.length) {
        const categories = filteredCategories.map((item) => item.name);
        const filteredProducts = array.filter(
          (product) => categories.includes(product.category) && product.rating >= minRating
        );
        setArr([...filteredProducts.slice(0, perPageValue)])
      }
      else {
        const filteredProducts = array.filter(
          (product) => product.rating >= minRating
        );
        setArr([...filteredProducts.slice(0, perPageValue)])
      }
    }
    else {
      if (e.target.value === 'Price - Low to High') {
        setArr(array.sort((a, b) => a.price - b.price));
      }
      else if (e.target.value === 'Price - High to Low') {
        setArr(array.sort((a, b) => b.price - a.price));
      }
      setArr([...array.slice(0, perPageValue)]);
    }
  };

  const handlePerPageValue = (e) => {
    setCurrentPage(1);
    setperPageValue(e.target.value);
    setPerPage(false);
    if (isCategory || isRating) {
      const filteredCategories = category_items.filter(
        (item) => item.applied === true
      );

      const filteredRatings = rating_items.filter(
        (item) => item.applied === true
      );

      if (sortText === 'Price - Low to High') {
        setArr(array.sort((a, b) => a.price - b.price));
      }
      else if (sortText === 'Price - High to Low') {
        setArr(array.sort((a, b) => b.price - a.price));
      }

      let minRating = 0;
      if (filteredRatings.length) {
        minRating = Math.min(
          ...filteredRatings.map((item) => item.name.split("★")[0])
        );
      }

      if (filteredCategories.length) {
        const categories = filteredCategories.map((item) => item.name);
        const filteredProducts = array.filter(
          (product) => categories.includes(product.category) && product.rating >= minRating
        );
        setArr([...filteredProducts.slice(0, e.target.value)])
      }
      else {
        const filteredProducts = array.filter(
          (product) => product.rating >= minRating
        );
        setArr([...filteredProducts.slice(0, e.target.value)])
      }
    }
    else {
      if (sortText === 'Price - Low to High') {
        setArr(array.sort((a, b) => a.price - b.price));
      }
      else if (sortText === 'Price - High to Low') {
        setArr(array.sort((a, b) => b.price - a.price));
      }
      setArr([...array.slice(0, e.target.value)]);
    }
  };

  const [showCategory, setShowCategory] = useState(true);
  const [showRating, setShowRating] = useState(true);

  const handleCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleRating = () => {
    setShowRating(!showRating);
  };

  return (
    <>
      <div className="content">
        {isOpen &&
          <Modal
            isOpen={isOpen}
            onCloseModal={toggleModal}
            handleClear={handleClear}
          >
            <div className="filterModal">
              <h4 className="flter-head">
                <span>
                  Filters
                </span>
                <span className="clear" onClick={handleClear}>
                  Clear
                </span>
              </h4>
              <div className="filter-content">
                <div className="filter-body">
                  <h4>
                    CATEGORY
                  </h4>
                  {category_items.map((data, index) => (
                    <label key={index} className="label">
                      <input type="checkbox" value={data.name} checked={data.applied} onChange={(e) => handleFilter(1, index)} />
                      <span>
                        {data.name}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="filter-body">
                  <h4>
                    RATING
                  </h4>
                  {rating_items.map((data, index) => (
                    <label key={index} className="label">
                      <input type="checkbox" value={data.name} checked={data.applied} onChange={(e) => handleFilter(2, index)} />
                      <span>
                        {data.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-footer">
                <button className="button" onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          </Modal>
        }
        <div className="filter">
          <h4 className="flter-head">
            <span>
              Filters
            </span>
            <span className="clear" onClick={handleClear}>
              CLEAR All
            </span>
          </h4>
          <div className="filter-content">
            <div className="filter-body">
              <h4 className={showCategory ? 'categoryH4minus' : 'categoryH4plus'} onClick={handleCategory}>
                CATEGORY
              </h4>
              {showCategory && category_items.map((data, index) => (
                <label key={index}>
                  <input type="checkbox" value={data.name} checked={data.applied} onChange={(e) => handleFilter(1, index)} />
                  <span>
                    {data.name}
                  </span>
                </label>
              ))}
            </div>
            <div className="filter-body">
              <h4 className={showRating ? 'ratingH4minus' : 'ratingH4plus'} onClick={handleRating}>
                RATINGS
              </h4>
              {showRating && rating_items.map((data, index) => (
                <label key={index}>
                  <input type="checkbox" value={data.name} checked={data.applied} onChange={(e) => handleFilter(2, index)} />
                  <span>
                    {data.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="text">
            <p>
              Showing {firstPage} - {fillProd > lastPage ? lastPage : fillProd} of{" "} {fillProd} results
            </p>
            <div className="filterImg">
              <img src={filterImage} alt="filter" />
              <p onClick={handleModal}>
                Filters
              </p>
            </div>
          </div>
          {arr.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              rating={product.rating}
              rating_count={product.rating_count}
              offer={product.offer}
            />
          ))}
        </div>
      </div>
      <div className="bottomPag">
        <div className="pageTxtDiv">
          <span className="pageTxt">
            Showing {firstPage} - {fillProd > lastPage ? lastPage : fillProd} of{" "} {fillProd} results
          </span>
        </div>
        <div>
          <Pagination currentPage={currentPage} totalCount={(isCategory || isRating) ? fillProd / (perPageValue / 12) : array.length / (perPageValue / 12)} onPageChange={page => setCurrentPage(page)} />
        </div>
        <div className="thirdDiv">
          <div>
            <OutsideClickHandler
              onOutsideClick={() => { setSort(false); }}
            >
              <button type="button" className="pgBtnSort" onClick={handleSort}>
                <span>
                  {sortText}
                </span>
                <span className={`caretIconSort ${sort ? 'caretTransform' : ''}`}>
                  <CaretIcon width="16px" height="16px" />
                </span>
              </button>
              {sort &&
                <ul>
                  <li>
                    <button type="button" value="Price - Low to High" onClick={handleSortText} >
                      Price - Low to High
                    </button>
                  </li>
                  <li>
                    <button type="button" value="Price - High to Low" onClick={handleSortText}>
                      Price - High to Low
                    </button>
                  </li>
                </ul>
              }
            </OutsideClickHandler>
          </div>
          <div>
            <OutsideClickHandler
              onOutsideClick={() => { setPerPage(false); }}
            >
              <button type="button" className="pgBtn" onClick={handlePerPage}>
                <span>
                  {`${perPageValue} per page`}
                </span>
                <span className={`caretIcon ${perPage ? 'caretTransform' : ''}`}>
                  <CaretIcon width="16px" height="16px" />
                </span>
              </button>
              {perPage &&
                <ul className="perPageUl">
                  <li>
                    <button type="button" value="12" onClick={handlePerPageValue}>
                      12 per page
                    </button>
                  </li>
                  <li>
                    <button type="button" value="24" onClick={handlePerPageValue}>
                      24 per page
                    </button>
                  </li>
                </ul>
              }
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClothingAndAccessories;

