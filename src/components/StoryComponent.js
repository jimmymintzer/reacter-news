import React, { PropTypes } from 'react';
import Comhead from './Comhead';
import TimeElement from './TimeElement';
import PointsElement from './PointsElement';
import CommentsLink from './CommentsLink';
import UserLink from './UserLink';
import StoryLink from './StoryLink';
import Spacer from './Spacer';

const StoryComponent = ({ story }) => {
  let subtext;

  if (story.type !== 'job') {
    subtext = (
      <div className="story-subtext">
        <PointsElement points={story.score} />
        <Spacer element={'by'}/>
        <Spacer element={<UserLink author={story.by} />}/>
        <Spacer element={<TimeElement time={story.time} />}/>
        <Spacer element={'|'}/>
        <Spacer element={<CommentsLink id={story.id} descendants={story.descendants} />}/>
      </div>
    );
  } else {
    subtext = (
      <div className="story-subtext">
        <TimeElement time={story.time} />
      </div>
    );
  }

  return (
    <div className="story-wrapper">
      <div className="story-title">
        <StoryLink url={story.url} title={story.title} />
        <Spacer element={<Comhead url={story.url} />}/>
      </div>
      {subtext}
    </div>
  );
};

StoryComponent.propTypes = {
  story: PropTypes.object,
};

module.exports = StoryComponent;
