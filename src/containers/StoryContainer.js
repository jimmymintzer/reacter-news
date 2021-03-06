import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';
import ItemsStore from '../stores/ItemsStore';
import { getItemInfo } from '../actions/ItemsActions';
import ItemComponent from '../components/ItemComponent';

function getState(props) { // props) {
  const id = Number(props.location.query.id) || -1;
  const story = ItemsStore.getItem(id);
  const kids = story && story.kidsValues;
  const loading = ItemsStore.getLoadingStatus();

  return {
    story,
    loading,
    kids,
  };
}

class StoryContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    story: PropTypes.object,
    loading: PropTypes.bool,
    kids: PropTypes.array,
  };
  componentDidMount() {
    const id = Number(this.props.location.query.id) || -1;

    getItemInfo(id);
  }
  componentDidUpdate(prevProps) {
    const oldId = Number(prevProps.location.query.id) || -1;
    const id = Number(this.props.location.query.id) || -1;

    if (oldId !== id) {
      getItemInfo(id);
    }
  }
  render() {
    const { story, loading, kids } = this.props;

    return (
      <div>
        <ItemComponent
          item={story}
          loading={loading}
          items={kids}
        />
      </div>
    );
  }
}

StoryContainer = connectToStores(StoryContainer, [ItemsStore], getState);

export default StoryContainer;
