import { Retry } from '../icons/retry';
import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ListErrorProps {
  readonly retry: () => void;
}

export const ListError: React.StatelessComponent<ListErrorProps> =
  ({retry}) => (
    <div className="lead text-center text-danger font-weight-bold">
      Loading items failed
      <button
        onClick={retry}
        className="btn btn-outline-danger border-0"
      >
        <Retry />
      </button>
    </div>);

ListError.displayName = 'ListError';

ListError.propTypes = {
  retry: PropTypes.func.isRequired,
};
