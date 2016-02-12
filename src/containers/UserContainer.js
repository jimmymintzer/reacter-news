import React, { Component, PropTypes } from 'react';
import connectToStores from '../utils/connectToStores';

import UserStore from '../stores/UsersStore';
import { getUserDetails } from '../utils/ReacterNewsWebAPIUtils';

import UserComponent from '../components/UserComponent';

function getState(props) {
  const id = props.location.query.id || '';
  const user = UserStore.get(id);
  const loading = UserStore.getLoadingStatus();

  return {
    user,
    loading,
  };
}

class UserContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    user: PropTypes.object,
    loading: PropTypes.bool,
  };
  componentWillMount() {
    const id = this.props.location.query.id || '';
    getUserDetails(id);
  }
  render() {
    const { loading, user } = this.props;

    return (
      <div>
        <UserComponent loading={loading} user={user} />
      </div>
    );
  }
}

UserContainer = connectToStores(UserContainer, [UserStore], getState);

export default UserContainer;
