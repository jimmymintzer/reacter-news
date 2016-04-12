import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LoaderComponent from './LoaderComponent';
// TODO: Changed from years ago to # of days
import DaysAgoElement from './DaysAgoElement';

const UserComponent = ({ loading, user }) => {
  if (loading) {
    return <LoaderComponent />;
  }
  if (user) {
    const { created, id, karma, about } = user;

    return (
      <div className="user-component">
        <table>
          <tbody>
            <tr>
              <td>user:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>created:</td>
              <td><DaysAgoElement time={created} /></td>
            </tr>
            <tr>
              <td>karma:</td>
              <td>{karma}</td>
            </tr>
            <tr>
              <td>about:</td>
              <td dangerouslySetInnerHTML={{ __html: about }}></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Link to="submitted" className="underline" query={{ id }}>submissions</Link>
              </td>
            </tr>
            {/*
              TODO: Fetch all thread comments
            <tr>
              <td></td>
              <td>
                <Link to="threads" className="underline" query={{ id: id }}>comments</Link>
              </td>
            </tr>
            */}
          </tbody>
        </table>
      </div>
    );
  }
  return <div />;
};

UserComponent.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
};

export default UserComponent;
