import React, { PropTypes } from 'react';
import LoaderComponent from './LoaderComponent';
import SpacerComponent from './SpacerComponent';
import FooterComponent from './FooterComponent';
import StoryComponent from './StoryComponent';
import CommentsComponent from './CommentsComponent';
import CommentHeader from './CommentHeader';
import PollComponent from './PollComponent';
import JobHeader from './JobHeader';

const ItemComponent = ({ loading, item, items, noFooter }) => {
  if (loading || !item) {
    return <LoaderComponent />;
  }

  if (item.title && item.title.indexOf('Ask HN:') > -1) {
    return (
      <div className="item-wrapper">
        <StoryComponent story={item}/>
        <div className="ask-hn-comment" dangerouslySetInnerHTML={{ __html: item.text }} />
        <CommentsComponent kids={item.kids} items={items}/>
        <div className="spacer-padding"></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }

  if (item.type === 'comment' && noFooter) {
    return (
      <div className="item-wrapper">
        <CommentHeader comment={item} />
      </div>
    );
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

  if (item.type === 'poll') {
    return (
      <div className="item-wrapper">
        <StoryComponent story={item}/>
        <PollComponent parts={item.parts} />
        <CommentsComponent kids={item.kids} items={items}/>
        <div className="spacer-padding"></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }

  if (item.type === 'job') {
    return (
      <div className="item-wrapper">
        <JobHeader story={item} />
        <div className="spacer-padding"></div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }

  return (
    <div className="item-wrapper">
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
