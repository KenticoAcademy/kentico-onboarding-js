import { RingLoader } from 'react-spinners';
import * as React from 'react';
import { css } from 'emotion';

const loader = css`
    margin: 0 auto;
`;

export const ListLoader: React.StatelessComponent = () => (
  <RingLoader
    className={loader}
    size={150}
    color="#007bff"
  />
);

ListLoader.displayName = 'ListLoader';
