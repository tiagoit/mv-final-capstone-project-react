import React from 'react';
import { useParams } from 'react-router-dom';
import Provider from './Provider';
import providers from '../constants/providers';

export default function Service() {
  const { serviceSlug } = useParams();
  const serviceProviders = providers.filter(p => p.services.includes(serviceSlug));

  return (
    <div>
      <div>Service: {serviceSlug}</div>
      <h2>Providers</h2>
      {serviceProviders.map(p => <Provider key={p.id} name={p.name} photo={p.photo} />)}
    </div>
  );
}
