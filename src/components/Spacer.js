import React, { PropTypes } from 'react';

const Spacer = ({ element }) =>
  <span className="insertSpaces">{element}</span>;

Spacer.propTypes = {
  text: PropTypes.string,
};

export default Spacer;
