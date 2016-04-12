import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TimeElement from './TimeElement';

const ItemLink = ({ id, time }) => {
  const link = {
    id,
  };

  return (
    <Link className="story-link" to="item" query={link}>
      <TimeElement time={time} />
    </Link>
  );
};

ItemLink.propTypes = {
  time: PropTypes.number,
  id: PropTypes.number,
};

export default ItemLink;
