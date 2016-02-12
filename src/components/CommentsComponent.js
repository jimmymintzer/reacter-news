import React, { PropTypes } from 'react';
import CommentComponent from './CommentComponent';

const CommentsComponent = ({ kids, action }) => {
  if (!kids) {
    return <div />;
  }

  if (kids.length > 0) {
    action(kids);
  }
  return (
    <div className="comment-wrapper"></div>
  );
};

CommentsComponent.propTypes = {
  kids: PropTypes.array,
  comments: PropTypes.object,
};

export default CommentsComponent;
