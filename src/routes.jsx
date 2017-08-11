import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import Search from './containers/Search';
import Generate from './containers/Generate';

export default (
  <Route path="/" component={Search}>
	<Route path="/ai/:artist" component={Generate} />
  </Route>
);

