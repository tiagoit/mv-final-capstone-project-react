import React from 'react';
import { useParams } from 'react-router-dom';

import Provider from './Provider';
import providers from '../constants/providers';
import { prettifySlug } from '../helpers';

const ProvidersList = () => {
  const { service } = useParams();
  const serviceProviders = providers.filter(p => p.services.includes(service));

  return (
    <div>
      <h2>Providers of service: {prettifySlug(service)}</h2>
      {serviceProviders.map(p => <Provider key={`provider-${p.id}`} provider={p} />)}
    </div>
  );
};
export default ProvidersList;
