import '../styles/sticky-footer.css';
import * as React from 'react';
import { PulseLoader } from 'react-spinners';

export const Loader: React.StatelessComponent = (): JSX.Element => (
  <div className="loader">
    <PulseLoader sizeUnit={'px'} size={15} color="#36D7B7"/>
  </div>
);

Loader.displayName = 'Loader';

