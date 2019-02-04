import '../styles/sticky-footer.css';
import * as React from 'react';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { ErrorMessage } from './ErrorMessage';

export type ItemErrorContainerProps = {
  readonly id: Guid,
};

export type ItemErrorStateProps = {
  readonly error: string | null,
};

export type ItemErrorDispatchProps = {
  readonly cancel: () => void,
  readonly retry: () => void,
};

type ItemErrorProps = ItemErrorContainerProps & ItemErrorStateProps & ItemErrorDispatchProps;

const itemErrorPropTypes: ValidationMap<ItemErrorProps> = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  cancel: PropTypes.func.isRequired,
  retry: PropTypes.func.isRequired,
};

export const ItemError: React.FunctionComponent<ItemErrorProps> = ({ error, cancel, retry }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="list-item">
      <ErrorMessage
        classNames="badge progress-bar-danger item-error"
        error="Error"
        tooltip={error}
      />
      <span
        className="glyphicon glyphicon-repeat"
        onClick={retry}
        tabIndex={-1}
      />
      <span
        className="glyphicon glyphicon-remove"
        onClick={cancel}
        tabIndex={-1}
      />
    </div>
  );
};

ItemError.displayName = 'ItemError';
ItemError.propTypes = itemErrorPropTypes;
