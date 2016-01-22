import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import connectToStores from '../utils/connectToStores';

import StoriesStore from '../stores/StoriesStore';
import APIUtils from '../utils/ReacterNewsWebAPIUtils';

import FooterComponent from '../components/FooterComponent';
import SpacerComponent from '../components/SpacerComponent';
import StoriesComponent from '../components/StoriesComponent';
import Spacer from '../components/Spacer';

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

class ShowStoriesContainer extends Component {
  static propTypes = {
    initialized: PropTypes.bool,
    loading: PropTypes.bool,
    stories: PropTypes.array,
    page: PropTypes.number,
    location: PropTypes.object,
  };
  componentWillMount() {
    APIUtils.getShowStories();
  }
  render() {
    const { initialized, loading, stories, page, location } = this.props;
    const linkTo = location.pathname || '/';

    return (
      <div>
        <div className="main">
          <h3 className="show-header">
            <span>Please read the </span>
            <a href="https://news.ycombinator.com/showhn.html">
              <u>rules</u>
            </a>
            <span>. You can also browse the</span>
            <Link to="shownew">
              <Spacer element={<u> newest</u>} />
            </Link>
            <span>Show HNs.</span>
          </h3>
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

ShowStoriesContainer = connectToStores(ShowStoriesContainer, [StoriesStore], getState);

export default ShowStoriesContainer;
