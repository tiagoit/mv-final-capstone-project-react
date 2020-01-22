import React from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from '@material-ui/core';

import Provider from './Provider';
import providers from '../constants/providers';
import './ProvidersList.scss';

const ProvidersList = () => {
  const { service } = useParams();
  const serviceProviders = providers.filter(p => p.services.includes(service));

  return (
    <div>
      <Typography variant="h4" component="h1">Service providers</Typography>

      <List className="providers">
        {serviceProviders.map(p => <Provider key={`provider-${p.id}`} provider={p} />)}
      </List>
    </div>
  );
};
export default ProvidersList;
