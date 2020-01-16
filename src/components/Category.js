import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import { prettifySlug } from '../helpers';
import categories from '../constants/categories';
import Service from './Service';

export default function Category() {
  const { categorySlug } = useParams();
  const catServices = categories[categorySlug].map(serviceSlug => (
    <Link to={`/${categorySlug}/${serviceSlug}`} key={serviceSlug}>
      {prettifySlug(serviceSlug)}
    </Link>
  ));

  return (
    <Router>
      <h2>Services</h2>
      {catServices}
      <Switch>
        <Route path={`/${categorySlug}/:serviceSlug`}><Service /></Route>
      </Switch>
    </Router>
  );
}
