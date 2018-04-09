import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Key } from '../@types/Key';

export interface IErrorProps {
  readonly error: string;
  readonly itemKey: Key | undefined;
}

export const Error: React.StatelessComponent<IErrorProps>
  = ({ error }) => (
  (error) ? (
    <div className="alert alert-danger">
      <strong>ERROR</strong> {error}
    </div>
  ) : null
);

Error.displayName = 'Error';

Error.propTypes = {
  error: PropTypes.string,
  itemKey: PropTypes.string,
};
