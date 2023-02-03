import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

const StarRating = (props) => {
  const rating = 4.5;

  return (
    <>
          <ReactStars count={5} edit={false} value={props.value} isHalf size={22} activeColor="#ffd700" />
    </>
  );
};

export default StarRating;
