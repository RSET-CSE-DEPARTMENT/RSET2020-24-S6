import React from 'react';
import {FaStarHalf, FaStar} from 'react-icons/fa'

const RatingStars = ({ ratings }) => {
  
    let avgRating = 0;
    let num = 0;
     ratings.map(rate=> {
      avgRating+= parseFloat(rate);
      num = num+1;
     })
    
    let realRating = parseInt((avgRating/num)*100)/100;
    console.log(realRating);
  const stars = [];
  while (realRating > 0) {
    if(realRating >= 1)
        stars.push(<FaStar/>);
    else if(realRating > 0)
        stars.push(<FaStarHalf/>);
    realRating = realRating-1;
  }
  console.log(stars);
  return <div>{stars}</div>;
};

export default RatingStars;