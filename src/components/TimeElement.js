import { unix } from 'moment';
import React, { PropTypes } from 'react';

const TimeElement = ({ time }) => {
  const unixTime = unix(time).fromNow();

  return (
    <span>{unixTime}</span>
  );
};

TimeElement.propTypes = {
  time: PropTypes.number,
};

export default TimeElement;
