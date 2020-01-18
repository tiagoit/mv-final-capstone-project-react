import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { prettifySlug } from '../helpers';
import categories from '../constants/categories';

const ServicesList = () => {
  const { category } = useParams();
  return (
    <div>
      <h2>Services from category: {prettifySlug(category)}</h2>
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
    </div>
  );
};
export default ServicesList;
