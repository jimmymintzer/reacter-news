import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LoaderComponent from './LoaderComponent';

const UserComponent = ({ loading, user }) => {
  if (loading) {
    return <LoaderComponent />;
  }
  if (user) {
    const { createdAt, id, karma, about, author } = user;

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
              <td>{createdAt}</td>
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
                <Link to="submitted" className="underline" query={{ id: author }}>submissions</Link>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Link to="threads" className="underline" query={{ id: author }}>comments</Link>
              </td>
            </tr>
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
