import React from 'react';
import Provider from './Provider';
import providers from '../constants/providers';

const Login = () => (
  <div>
    <h2>Favourite providers</h2>
    {providers.map(p => <Provider key={p.id} provider={p} />)}
  </div>
);
export default Login;
