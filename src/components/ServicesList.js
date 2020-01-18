import React from 'react';
import { Link as RouterLink, useParams, Switch, Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { prettifySlug } from '../helpers';
import categories from '../constants/categories';
import ProvidersList from './ProvidersList';

const ServicesList = () => {
  const { category } = useParams();
  return (
    <div>
      <h2>Services from {prettifySlug(category)} category</h2>
      {categories[category].map(service => (
        <Button
          key={service}
          size="small"
          color="primary"
          component={RouterLink}
          to={`/category/${category}/service/${service}`}
        >
          {prettifySlug(service)}
        </Button>
      ))}
      <Switch>
        <Route path={`/category/${category}/service/:service`}><ProvidersList /></Route>
        <Route path="/login"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
};
export default ServicesList;
