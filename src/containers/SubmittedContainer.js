import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';

import UserStore from '../stores/UsersStore';
import { getUserSubmissions } from '../actions/UserActions';

import StoriesComponent from '../components/StoriesComponent';
import SpacerComponent from '../components/SpacerComponent';
import FooterComponent from '../components/FooterComponent';

function getState(props) {
  const id = props.location.query.id || '';
  const page = Number(props.location.query.p) || 1;
  const items = UserStore.getSubmittedItems(id, page, 'story') || [];
  const loading = UserStore.getLoadingStatus();

  return {
    id,
    items,
    loading,
    page,
  };
}

class SubmittedContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    items: PropTypes.array,
    loading: PropTypes.bool,
    page: PropTypes.number,
    id: PropTypes.string,
  };
  componentDidMount() {
    const id = this.props.location.query.id || '';

    getUserSubmissions(id);
  }
  componentDidUpdate(prevProps) {
    const oldId = prevProps.location.query.id || '';
    const id = this.props.location.query.id || '';

    const oldPage = Number(prevProps.location.query.p) || 1;
    const page = Number(this.props.location.query.p) || 1;

    if (oldId !== id || oldPage !== page) {
      getUserSubmissions(id);
    }
  }
  render() {
    const { loading, items, page, id } = this.props;
    const linkTo = location.pathname || '/';

    return (
      <div>
        <div className="main">
          <StoriesComponent
            stories={items}
            loading={loading}
            page={page}
            linkTo={linkTo}
            userId={id}
          />
        </div>
        <SpacerComponent />
        <FooterComponent />
      </div>
    );
  }
}

SubmittedContainer = connectToStores(SubmittedContainer, [UserStore], getState);

export default SubmittedContainer;
