import React from 'react'
import ReactDOM from 'react-dom'
// npm install --save react-router to use react-router
// import { Router, IndexRoute, Route, browserHistory } from 'react-router'

/*
 * Mock up Data
 */

// create root using react-router
/*
const root = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
*/

const root = (
  <div>
    This is App
  </div>
)

ReactDOM.render(
  root,
  document.getElementById('app')
)
