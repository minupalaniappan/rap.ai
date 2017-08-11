import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

// Components
import App from './containers/App';
import Search from './containers/Search';
import Generate from './containers/Generate';

export default (
  <div>
  	<Route path="/" component={Search} />
  	<Route path="/search" component={Search} />
	<Route path="/ai/:artist" component={Generate} />
  </div>
);

