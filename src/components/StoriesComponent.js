import React from 'react';
import { Link } from 'react-router';

import StoryComponent from './StoryComponent';
import LoaderComponent from './LoaderComponent';

const StoriesComponent = ({ loading, initialized, stories, page, linkTo }) => {
  document.title = 'Reacter News';

  const storiesComponents = stories.map((story, index) => {
    return (
      <li key={index}>
        <StoryComponent story={story} />
      </li>
    );
  });

  if (loading && !initialized) {
    return (
      <LoaderComponent />
    );
  }
  const index = (30 * (page - 1)) + 1;
  const nextPage = page + 1;

  const link = (stories.length === 30) ?
    <Link to={linkTo} href="#" query={{ p: nextPage }}>More</Link>
    : null;

  return (
    <div>
      <ol className="stories" start={index}>
        {storiesComponents}
      </ol>
      <div className="more-link">
        {link}
      </div>
    </div>
  );
};

export default StoriesComponent;
