import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CommentsComponent from './CommentsComponent';

const CommentComponent = ({ comment, comments }) => {
  const ItemLink = <Link to="item" className="story-link" query={{ id: comment.id }}>Link</Link>;
  const UserLink = <Link to="user" className="story-link" query={{ id: comment.by }}>{comment.by}</Link>;

  return (
    <div className="comment">
      <div className="username-row">{UserLink} | {ItemLink}</div>
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
      <CommentsComponent comments={comment.kids} comments={comments}/>
    </div>
  );
};

CommentComponent.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
};

export default CommentComponent;
