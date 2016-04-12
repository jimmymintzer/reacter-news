import React, { PropTypes } from 'react';
import UserLink from './UserLink';
import Spacer from './Spacer';
import ItemLink from './ItemLink';
import ParentLink from './ParentLink';

const CommentHeader = ({ comment }) => {
  const { by, id, time, text, deleted, parent } = comment;
  if (deleted) {
    return <span />;
  }

  return (
    <div className="comment">
      <div className="username-row">
        <UserLink author={by}/>
        <Spacer />
        <ItemLink id={id} time={time}/>
        <Spacer element={'|'} />
        <ParentLink id={parent} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

CommentHeader.propTypes = {
  comment: PropTypes.object,
};

export default CommentHeader;
