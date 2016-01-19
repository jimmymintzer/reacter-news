import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CommentsLink = ({ id, descendants }) => {
  const link = {
    id,
  };

  let text = descendants;
  if (text === 0) {
    text = 'discuss';
  } else if (text === 1) {
    text = `${text} comment`;
  } else {
    text = `${text} comments`;
  }

  return (
    <Link className="story-link" to="item" query={link}> {text}</Link>
  );
};

CommentsLink.propTypes = {
  descendants: PropTypes.number,
  id: PropTypes.number,
};

export default CommentsLink;
