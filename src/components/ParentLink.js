import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ParentLink = ({ id }) => {
  const link = {
    id,
  };

  return (
    <Link className="story-link" to="item" query={link}>Parent</Link>
  );
};

ParentLink.propTypes = {
  id: PropTypes.number,
};

export default ParentLink;
