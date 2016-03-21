import moment from 'moment';
import React, { PropTypes } from 'react';

const TimeElement = ({ time }) => {
  const currentTime = moment();
  const userTimeCreated = moment.unix(time);
  const numberOfDays = Number(-1) * userTimeCreated.diff(currentTime, 'days');

  return (
    <span>{numberOfDays} days ago</span>
  );
};

TimeElement.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeElement;
