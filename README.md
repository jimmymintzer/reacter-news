# README #

Reacter News is a Hacker News (https://news.ycombinator.com/) clone.

#### It uses:
* react
* flux pattern
* react-router
* bluebird promises
* Webpack
* es5-shim
* 6to5
* Firebase HN API

### How do I get set up? ###

####Setup
  * npm install
  * npm start
  * open browser to http://localhost:8080


### Known Issues ###
* User object contains an array of submitted items. If that comment is nested in another comment, it will display twice, 
both as the top of the comment tree.