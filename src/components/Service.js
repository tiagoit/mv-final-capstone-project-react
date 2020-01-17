import React from 'react';
import { useParams } from 'react-router-dom';

import Provider from './Provider';
import providers from '../constants/providers';

const Service = () => {
  const { service } = useParams();
  const serviceProviders = providers.filter(p => p.services.includes(service));

  return (
    <div>
      <div>Service: {service}</div>
      <h2>Providers</h2>
      {serviceProviders.map(p => <Provider key={`provider-${p.id}`} provider={p} />)}
    </div>
  );
};
export default Service;
