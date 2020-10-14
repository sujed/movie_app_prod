import React from 'react';

const Rating = ({ stars }) => {
  return (
    <span>
      {stars >= 1 && <i className="fas fa-star"></i>}
      {stars <= 1 && <i className="far fa-star"></i>}
      {stars >= 2 && <i className="fas fa-star"></i>}
      {stars <= 2 && <i className="far fa-star"></i>}
      {stars >= 3 && <i className="fas fa-star"></i>}
      {stars < 3 && <i className="far fa-star"></i>}
      {stars >= 4 && <i className="fas fa-star"></i>}
      {stars < 4 && <i className="far fa-star"></i>}
      {stars >= 5 && <i className="fas fa-star"></i>}
      {stars < 5 && <i className="far fa-star"></i>}
      {stars >= 6 && <i className="fas fa-star"></i>}
      {stars < 6 && <i className="far fa-star"></i>}
      {stars >= 7 && <i className="fas fa-star"></i>}
      {stars < 7 && <i className="far fa-star"></i>}
      {stars >= 8 && <i className="fas fa-star"></i>}
      {stars < 8 && <i className="far fa-star"></i>}
      {stars >= 9 && <i className="fas fa-star"></i>}
      {stars < 9 && <i className="far fa-star"></i>}
      {stars >= 10 && <i className="fas fa-star"></i>}
      {stars < 10 && <i className="far fa-star"></i>}| {stars}/10
    </span>
  );
};

export default Rating;
