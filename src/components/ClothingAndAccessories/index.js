import React, { useState } from "react";
import Card from "../Card";
import "./clothing.css";
import Data from "../../data.json";
import filterImage from '../../images/logo/filter.png';
import Modal from "../Modal";

const array = [...Data];

const ClothingAndAccessories = () => {

  let [arr, setArr] = useState([...array]);

  const categoryItems = [...new Set(arr.map((data) => data.category)),]
    .map((category) => {
      return { name: category, applied: false };
    });

  let [category_items, setCategoryItems] = useState([...categoryItems]);

  const ratingItems = [4, 3, 2, 1].map((rating) => {
    return { name: `${rating}★ & above`, applied: false };
  });

  let [rating_items, setRatingsItems] = useState([...ratingItems]);

  const [isOpen, toggleModal] = useState(false);

  const handleModal = () => {
    toggleModal(true);
  };

  function myFun() {
    toggleModal(false);
  }

  const handleApply = () => {
    const myTimeout = setTimeout(myFun, 500);
  };

  const handleClear = () => {
    const category = category_items;
    category.forEach((item) => (item.applied = false));
    setCategoryItems(category);
    const rating = rating_items;
    rating.forEach((item) => (item.applied = false));
    setRatingsItems(rating);
    setArr(array);
  };

  const handleFilter = (id, index) => {
    if (id == 1) {
      const category = category_items;
      category[index].applied = !category[index].applied;
      setCategoryItems(category);
    }
    else if (id == 2) {
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
      setArr(filteredProducts);
    }
    else {
      const filteredProducts = array.filter(
        (product) => product.rating >= minRating
      );
      setArr(filteredProducts);
    }
  };

  return (
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
                  <label className="label">
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
                  <label className="label">
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
            <h4>
              CATEGORY
            </h4>
            {category_items.map((data, index) => (
              <label>
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
              <label>
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
            Showing 1 - {arr.length} of{" "} {arr.length} results
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
  );
};

export default ClothingAndAccessories;

