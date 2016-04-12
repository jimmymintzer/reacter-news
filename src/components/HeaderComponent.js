import React from 'react';
import { Link } from 'react-router';

import Spacer from './Spacer';

const HeaderComponent = ({ pathname, queryParams }) => {
  let showNewStyle = { display: 'none' };
  let submittedNewStyle = { display: 'none' };
  let threadsNewStyle = { display: 'none' };
  let queryTitle;

  switch (pathname) {
    case 'shownew':
      showNewStyle = { display: 'inline-block' };
      break;
    case 'submitted':
      queryTitle = queryParams.id + '\'s submissions';
      submittedNewStyle = { display: 'inline-block' };
      break;
    case 'threads':
      queryTitle = queryParams.id + '\'s comments';
      threadsNewStyle = { display: 'inline-block' };
      break;
    default:
      break;
  }

  return (
    <header>
      <ul>
        <li>
          <div className="logo">
            <span><a href="#">R</a></span>
          </div>
        </li>
        <li>
          <div className="heading">
            <Link to="news">Reacter News</Link>
          </div>
        </li>
        <li>
          <ul className="nested-list">
            <li>
              <Link to="newest" activeClassName="active">new</Link>
            </li>
            <Spacer element={<li>|</li>} />
            {/*
              No real API for this functionality
             <li>
             <Link to="newcomments" activeClassName="active">comments</Link>
             </li>
             <Spacer element={<li>|</li>} />
            */}
            <li>
              <Link to="show" activeClassName="active">show</Link>
            </li>
            <Spacer element={<li>|</li>} />
            <li>
              <Link to="ask" activeClassName="active">ask</Link>
            </li>
            <Spacer element={<li>|</li>} />
            <li>
              <Link to="jobs" activeClassName="active">jobs</Link>
            </li>
            <Spacer element={<li style={showNewStyle}>|</li>} />
            <li style={showNewStyle}>
              <Link to="shownew" activeClassName="active">shownew</Link>
            </li>
            <Spacer element={<li style={submittedNewStyle}>|</li>} />
            <li style={submittedNewStyle}>
              <Link to="submitted" activeClassName="active" query={queryParams}>{queryTitle}</Link>
            </li>
            <Spacer element={<li style={threadsNewStyle}>|</li>} />
            <li style={threadsNewStyle}>
              <Link to="threads" query={{ id: queryParams }}>{queryTitle}</Link>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default HeaderComponent;
