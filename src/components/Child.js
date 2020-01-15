import React from 'react';
import { useParams } from 'react-router-dom';

export default function Child() {
  const { id } = useParams();
  return (
    <div>ID: {id}</div>
  );
}
