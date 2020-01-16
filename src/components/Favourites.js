import React from 'react';
import Provider from './Provider';
import providers from '../constants/providers';

export default function Login() {
  return (
    <div>
      <h2>Favourite providers</h2>
      {providers.map(p => <Provider key={p.id} name={p.name} photo={p.photo} />)}
    </div>
  );
}
