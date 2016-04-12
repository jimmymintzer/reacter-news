import React, { PropTypes } from 'react';
import CommentComponent from './CommentComponent';

const CommentsComponent = ({ kids, items }) => {
  if (!kids || kids.length === 0) {
    return <div />;
  }

  const kidsVals = kids.map((kid) => {
    return items
      .filter(item => {
        if (kid === item.id) {
          return item;
        }
      })
      .shift();
  });


  return (
    <div className="comment-wrapper">
      {kidsVals.map(kid => {
        if (kid) {
          return <CommentComponent key={kid.id} comment={kid} items={items}/>;
        }
      })}
    </div>
  );
};

CommentsComponent.propTypes = {
  kids: PropTypes.array,
  comments: PropTypes.object,
};

export default CommentsComponent;
