import React from 'react';
import { Link } from 'react-router';

import StoryComponent from './StoryComponent';
import LoaderComponent from './LoaderComponent';

const StoriesComponent = ({ loading, stories, page, linkTo, userId }) => {
  document.title = 'Reacter News';

  const storiesComponents = stories.map((story) => {
    return (
      <li key={story.id}>
        <StoryComponent story={story} />
      </li>
    );
  });

  if (loading) {
    return (
      <LoaderComponent />
    );
  }
  const index = (30 * (page - 1)) + 1;
  const nextPage = page + 1;
  const queryObj = (userId) ? { p: nextPage, id: userId } : { p: nextPage };

  const link = (stories.length === 30) ?
    <Link to={linkTo} href="#" query={queryObj}>More</Link>
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
