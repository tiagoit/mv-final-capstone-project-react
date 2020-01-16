import React from 'react';
import { useParams } from 'react-router-dom';

export default function Service() {
  const { id } = useParams();
  return (
    <div>Service: {id}</div>
  );
}
