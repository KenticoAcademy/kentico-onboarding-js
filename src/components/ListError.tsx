import * as React from 'react';
import * as PropTypes from 'prop-types';

export type ListErrorDispatchProps = {
  onReloadClick: () => void
};

export type ListErrorProps = ListErrorDispatchProps;


export const ListError: React.StatelessComponent<ListErrorProps> = ({ onReloadClick }) => (
  <button
    type="button"
    className="btn btn-danger border-0"
    onClick={onReloadClick}
  > Try Luck Again
  </button>
);

ListError.displayName = 'ListError';

ListError.propTypes = {
  onReloadClick: PropTypes.func.isRequired,
};
