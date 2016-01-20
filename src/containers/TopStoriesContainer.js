import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';

import StoriesStore from '../stores/StoriesStore';
import APIUtils from '../utils/ReacterNewsWebAPIUtils';

import FooterComponent from '../components/FooterComponent';
import SpacerComponent from '../components/SpacerComponent';
import StoriesComponent from '../components/StoriesComponent';

function getState(props) {
  const page = Number(props.location.query.p) || 1;
  const stories = StoriesStore.getStoriesByPage(page).toJS() || [];
  const loading = StoriesStore.getLoadingStatus() || true;
  const initialized = StoriesStore.getInitializedState() || false;

  return {
    stories,
    loading,
    initialized,
    page,
  };
}

class TopStoriesContainer extends Component {
  static propTypes = {
    initialized: PropTypes.bool,
    loading: PropTypes.bool,
    stories: PropTypes.array,
  };
  componentWillMount() {
    APIUtils.getTopStories();
  }
  render() {
    const { initialized, loading, stories, page } = this.props;

    return (
    <div>
      <div className="main">
        <StoriesComponent
          stories={stories}
          loading={loading}
          initialized={initialized}
          page={page}
        />
      </div>
      <SpacerComponent />
      <FooterComponent />
    </div>

    );
  }
}

TopStoriesContainer = connectToStores(TopStoriesContainer, [StoriesStore], getState);

export default TopStoriesContainer;
