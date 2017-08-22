import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

// Components
import Search from './containers/Search';
import Generate from './containers/Generate';

export default (
  <div>
  	<Route path="/" component={Search} />
  	<Route path="/search" component={Search} />
	<Route path="/ai/:artist/:lines" component={Generate} />
  </div>
);

