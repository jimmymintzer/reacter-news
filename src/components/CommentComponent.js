import React, { PropTypes } from 'react';
import CommentsComponent from './CommentsComponent';
import UserLink from './UserLink';
import ItemLink from './ItemLink';
import Spacer from './Spacer';

const CommentComponent = ({ comment, items }) => {
  if (comment.deleted) {
    return <span />;
  }
  return (
    <div className="comment">
      <div className="username-row">
        <UserLink author={comment.by}/>
        <Spacer />
        <ItemLink id={comment.id} time={comment.time}/>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
      <CommentsComponent kids={comment.kids} items={items} />
    </div>
  );
};

CommentComponent.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
};

export default CommentComponent;
