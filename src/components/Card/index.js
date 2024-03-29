import React from "react";
import "./card.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = (props) => {
  return (
    <div className="product">
      <LazyLoadImage
        alt={props.title}
        width={200}
        height={80}
        src={props.image}
        effect="blur"
      />
      <p className="shorten">
        {props.title}
      </p>
      <p className="shorten description">
        {props.description}
      </p>
      <h5 className="h6">
        <span className="rating">
          {props.rating} <i className="fa fa-star"></i>
        </span>
        <span className="description">
          ({props.rating_count})
        </span>
      </h5>
      <h6 className="price">
        <span style={{ fontSize: "small" }}>
          $ {props.price - Math.trunc(Math.round((props.price) * props.discountPercentage) / 100)}
        </span>
        <span className="mrp">
          $ {props.price}
        </span>
        <span className="offer">
          {props.discountPercentage}% off
        </span>
      </h6>
    </div>
  );
};

export default Card;
