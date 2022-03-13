import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <div className="product">
      <img src={props.image} alt={props.title} />
      <p className="shorten">
        {props.title}
      </p>
      <p className="shorten description">
        {props.description}
      </p>
      <h6 className="h6">
        <span className="rating">
          {props.rating} <i className="fa fa-star"></i>
        </span>
        <span className="description">
          ({props.rating_count})
        </span>
      </h6>
      <h6 className="price">
        <span style={{ fontSize: "small" }}>
          $ {props.price}
        </span>
        <span className="mrp">
          $ {(props.price / 20).toFixed(2)}
        </span>
        <span className="offer">
          {props.offer}% off
        </span>
      </h6>
    </div>
  );
};

export default Card;
