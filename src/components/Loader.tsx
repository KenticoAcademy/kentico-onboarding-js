import * as React from 'react';

const Loader: React.SFC = () => (
  <div>
    Items are loading...
    <div className="loader" />
  </div>
);

Loader.displayName = 'Loader';

export { Loader };
