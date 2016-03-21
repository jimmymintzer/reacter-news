import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import connectToStores from '../utils/connectToStores';

import ItemsStore from '../stores/ItemsStore';
import { getShowStories } from '../actions/ItemsActions';

import FooterComponent from '../components/FooterComponent';
import SpacerComponent from '../components/SpacerComponent';
import StoriesComponent from '../components/StoriesComponent';
import Spacer from '../components/Spacer';

function getState(props) {
  const page = Number(props.location.query.p) || 1;
  const stories = ItemsStore.getItems(page, 'showstories');
  const loading = ItemsStore.getLoadingStatus();

  return {
    stories,
    loading,
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
  componentDidMount() {
    const page = Number(this.props.location.query.p) || 1;

    getShowStories(page);
  }
  componentDidUpdate(prevProps) {
    const oldPage = Number(prevProps.location.query.p) || 1;
    const page = Number(this.props.location.query.p) || 1;

    if (oldPage !== page) {
      getShowStories(page);
    }
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

ShowStoriesContainer = connectToStores(ShowStoriesContainer, [ItemsStore], getState);

export default ShowStoriesContainer;
