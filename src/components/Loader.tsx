import * as React from 'react';

const Loader: React.StatelessComponent = () => (
  <div>
    Items are loading...
    <div className="loader" />
  </div>
);

Loader.displayName = 'Loader';

export { Loader };
