import React, { PropTypes } from 'react';
import LoaderComponent from './LoaderComponent';
import SpacerComponent from './SpacerComponent';
import FooterComponent from './FooterComponent';
import StoryComponent from './StoryComponent';
import CommentsComponent from './CommentsComponent';
import CommentHeader from './CommentHeader';

const ItemComponent = ({ loading, item, items }) => {
  if (loading || !item) {
    return <LoaderComponent />;
  }

  if (item.type === 'comment') {
    return (
      <div className="item-wrapper">
        <CommentHeader comment={item} />
        <CommentsComponent kids={item.kids} items={items}/>
        <div className="spacer-padding"></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }

  if (item.type === 'story') {
    return (
      <div className="item-wrapper">
        <StoryComponent story={item}/>
        <CommentsComponent kids={item.kids} items={items}/>
        <div className="spacer-padding"></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }

};

ItemComponent.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool,
};

export default ItemComponent;
