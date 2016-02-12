import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';
import StoriesStore from '../stores/ItemsStore';
import { getStory } from '../utils/ReacterNewsWebAPIUtils';
import ItemComponent from '../components/ItemComponent';
import { getComments } from '../actions/CommentsActionCreators';

function getState(props) { // props) {
  const id = Number(props.location.query.id) || -1;
  const story = StoriesStore.getStory(id);
  const initialized = StoriesStore.getInitializedState();
  const loading = StoriesStore.getLoadingStatus();

  return {
    story,
    initialized,
    loading,
  };
}

class StoryContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    story: PropTypes.object,
    initialized: PropTypes.bool,
    loading: PropTypes.bool,
    comments: PropTypes.object,
  };
  componentWillMount() {
    const id = Number(this.props.location.query.id) || -1;
    getStory(id);
  }
  render() {
    const { story, initialized, loading } = this.props;
    console.log('story', story);
    return (
      <div>
        <ItemComponent
          item={story}
          initialized={initialized}
          loading={loading}
          action={getComments}
        />
      </div>
    );
  }
}

StoryContainer = connectToStores(StoryContainer, [StoriesStore], getState);

export default StoryContainer;
