import moment, { unix } from 'moment';
import React, { PropTypes } from 'react';

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%d minutes ago',
    m: '%d minute ago',
    mm: '%d hour ago',
    h: '%d hour ago',
    hh: '%d hours ago',
    d: 'a day ago',
    dd: '%d days ago',
    M: '%d month ago',
    MM: '%d months ago',
    y: '%d year ago',
    yy: '%d years ago',
  },
});

const TimeElement = ({ time }) => {
  const unixTime = unix(time).fromNow();

  return (
    <span>{unixTime}</span>
  );
};

TimeElement.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimeElement;
