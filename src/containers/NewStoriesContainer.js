import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';

import ItemsStore from '../stores/ItemsStore';
import { getNewStories } from '../actions/ItemsActions';

import FooterComponent from '../components/FooterComponent';
import SpacerComponent from '../components/SpacerComponent';
import StoriesComponent from '../components/StoriesComponent';

function getState(props) {
  const page = Number(props.location.query.p) || 1;
  const stories = ItemsStore.getItems(page, 'newstories');
  const loading = ItemsStore.getLoadingStatus();

  return {
    stories,
    loading,
    page,
  };
}

class NewestStoriesContainer extends Component {
  static propTypes = {
    initialized: PropTypes.bool,
    loading: PropTypes.bool,
    stories: PropTypes.array,
    page: PropTypes.number,
    location: PropTypes.object,
  };
  componentDidMount() {
    const page = Number(this.props.location.query.p) || 1;

    getNewStories(page);
  }
  componentDidUpdate(prevProps) {
    const oldPage = Number(prevProps.location.query.p) || 1;
    const page = Number(this.props.location.query.p) || 1;

    if (oldPage !== page) {
      getNewStories(page);
    }
  }
  render() {
    const { initialized, loading, stories, page, location } = this.props;
    const linkTo = location.pathname || '/';

    return (
      <div>
        <div className="main">
          <StoriesComponent
            stories={stories}
            loading={loading}
            initialized={initialized}
            page={page}
            linkTo={linkTo}
          />
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }
}

NewestStoriesContainer = connectToStores(NewestStoriesContainer, [ItemsStore], getState);

export default NewestStoriesContainer;
