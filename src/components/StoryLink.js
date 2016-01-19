import React, { PropTypes } from 'react';

const UserLink = ({ url, title }) => {
  return (
    <a href={ url }>{title}</a>
  );
};

UserLink.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default UserLink;
