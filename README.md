# README #

Reacter News is a Hacker News (https://news.ycombinator.com/) clone.

#### It uses:
* react
* flux pattern
* react-router
* bluebird promises
* Webpack
* Algolia HN API
* Firebase HN API

### How do I get set up? ###

####Setup
  * npm install
  * npm start
  * open browser to http://localhost:8080


### Known Issues ###

* Firebase returns all top stories. Algolia and firebase get out of sync and algolia will return HTTP 500 error if the
story hasn't been indexed. In WebAPIUtils, if the item isn't in algolia it will pull the firebase item. The comments in
the firebase API only return the item IDs, not the values. If the story returned is from firebase API, it will only show
the length of the comments array returned.

* If the story comes back from firebase, it means there was an error looking it up in algolia. This means if you try to
view the stories comments, it will hit a HTTP 500 and no story comes back.