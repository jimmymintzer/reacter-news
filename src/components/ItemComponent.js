import React, { PropTypes } from 'react';
import LoaderComponent from './LoaderComponent';
import SpacerComponent from './SpacerComponent';
import FooterComponent from './FooterComponent';
import StoryComponent from './StoryComponent';
import CommentsComponent from './CommentsComponent';

const ItemComponent = ({ loading, item, items }) => {
  if (loading || !item) {
    return <LoaderComponent />;
  }

  return (
    <div className="item-wrapper">
      <StoryComponent story={item}/>
      <CommentsComponent kids={item.kids} items={items}/>
      <div className="spacer-padding"></div>
      <SpacerComponent />
      <FooterComponent />
    </div>
  );
};

ItemComponent.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool,
};

export default ItemComponent;
