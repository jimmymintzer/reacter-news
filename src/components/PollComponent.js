import React, { PropTypes } from 'react';
import PointsElement from './PointsElement';

const PollComponent = ({ parts }) => {
  const partsElements = parts.map(part => {
    const { id, text, score } = part;

    return (
      <div className="poll-element" key={id}>
        <div>{text}</div>
        <div className="poll-subtext"><PointsElement points={score} /></div>
      </div>
    );
  });

  return (
    <div className="poll-wrapper">
      {partsElements}
    </div>
  );
};

PollComponent.propTypes = {
  parts: PropTypes.array.isRequired,
};

export default PollComponent;
