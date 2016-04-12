import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserLink = ({ author }) => {
  return (
    <Link to="user" className="story-link" query={{ id: author }}>{author}</Link>
  );
};

UserLink.propTypes = {
  author: PropTypes.string,
};

export default UserLink;
