import { PulseLoader } from 'react-spinners';
import * as React from 'react';

export const ItemLoader: React.StatelessComponent = (): JSX.Element => (
  <PulseLoader
    color="#007bff"
    size={10}
    className="float-right"
  />
);

ItemLoader.displayName = 'ItemLoader';
