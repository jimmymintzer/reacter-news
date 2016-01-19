import React, { PropTypes } from 'react';

const PointsElement = ({ points }) => {
  const text = (points === 1) ? 'point' : 'points';

  return (
    <span>{points} {text}</span>
  );
};

PointsElement.propTypes = {
  points: PropTypes.number.isRequired,
};

export default PointsElement;
