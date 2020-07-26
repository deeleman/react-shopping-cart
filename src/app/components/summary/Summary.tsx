import React from 'react';

export const Summary: React.FunctionComponent = (props) => (
  <aside className="summary">
    <h1 className="main">Order Summary</h1>
    {props.children}
  </aside>
);