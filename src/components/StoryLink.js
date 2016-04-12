import React, { PropTypes } from 'react';

const StoryLink = ({ url, title }) => {
  return (
    <a href={ url }>{title}</a>
  );
};

StoryLink.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default StoryLink;
