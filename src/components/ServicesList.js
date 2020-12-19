import React from 'react';
import { NavLink as RouterLink, useParams, Switch, Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { prettifySlug } from '../helpers';
import categories from '../constants/categories';
import ProvidersList from './ProvidersList';
import './ServicesList.scss';

const ServicesList = () => {
  const { category } = useParams();
  return (
    <div>
      <h2>Services from {prettifySlug(category)} category</h2>
      <div className="services">
        {categories[category].map(service => (
          <Button
            variant="contained"
            key={service}
            size="small"
            component={RouterLink}
            to={`/category/${category}/service/${service}`}
          >
            {prettifySlug(service)}
          </Button>
        ))}
      </div>
      <Switch>
        <Route path={`/category/${category}/service/:service`}><ProvidersList /></Route>
        <Route path="/login"><Redirect to="/" /></Route>
      </Switch>
    </div>
  );
};
export default ServicesList;
