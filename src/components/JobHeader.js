import React, { PropTypes } from 'react';
import Comhead from './Comhead';
import TimeElement from './TimeElement';
import PointsElement from './PointsElement';
import CommentsLink from './CommentsLink';
import UserLink from './UserLink';
import StoryLink from './StoryLink';
import Spacer from './Spacer';

const JobHeader = ({ story }) => {
  return (
    <div className="story-wrapper">
      <div className="story-title">
        <StoryLink url={story.url} title={story.title} />
        <Spacer element={<Comhead url={story.url} />}/>
      </div>
      <div className="story-subtext">
        <TimeElement time={story.time} />
      </div>
    </div>
  );
};

JobHeader.propTypes = {
  story: PropTypes.object,
};

module.exports = JobHeader;
