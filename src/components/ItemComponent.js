import React, { PropTypes } from 'react';
import LoaderComponent from './LoaderComponent';
import SpacerComponent from './SpacerComponent';
import FooterComponent from './FooterComponent';
import StoryComponent from './StoryComponent';
import CommentsComponent from './CommentsComponent';

const ItemComponent = ({ loading, initialized, item, action }) => {
  if (loading && !initialized) {
    return <LoaderComponent />;
  }
  const { type } = item;

  if (type === 'poll') {
    // TODO: Implement poll
  } else if (type === 'comment') {
    // TODO Implement comment
  }

  const renderedHTML = (
    <div>
      <StoryComponent story={item}/>
      <CommentsComponent kids={item.kids} action={action}/>
    </div>
  );


  return (
    <div className="item-wrapper">
      {renderedHTML}
      <div className="spacer-padding"></div>
      <SpacerComponent />
      <FooterComponent />
    </div>
  );
};

ItemComponent.propTypes = {
  item: PropTypes.object,
  initialized: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ItemComponent;
