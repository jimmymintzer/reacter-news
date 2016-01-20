import React, { PropTypes } from 'react';

const Comhead = ({ url }) => {
  if (url) {
    const comhead = url.match(/^https?:\/\/(?:www.)*([^\/?#]+)/)[1];
    const urlLink = `from?site=${comhead}`;

    return (
      <span className="comhead">
        (<a href={urlLink}>{comhead}</a>)
      </span>
    );
  }
  return <span></span>;
};

Comhead.propTypes = {
  url: PropTypes.string,
};

export default Comhead;
