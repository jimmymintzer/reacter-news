import moment from 'moment';
import React, { PropTypes } from 'react';

const DaysAgoElement = ({ time }) => {
  const currentTime = moment();
  const userTimeCreated = moment.unix(time);
  const numberOfDays = Number(-1) * userTimeCreated.diff(currentTime, 'days');

  return (
    <span>{numberOfDays} days ago</span>
  );
};

DaysAgoElement.propTypes = {
  time: PropTypes.number,
};

export default DaysAgoElement;
