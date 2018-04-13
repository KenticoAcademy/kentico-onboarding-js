import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IProps {
  errorMessage: string;
  onCloseError: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRetry: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ItemError: React.StatelessComponent<IProps> = (props: IProps) =>
  <span
    className="glyphicon glyphicon-exclamation-sign text-danger pull-right"
  >
    <strong>
      Error: {props.errorMessage}
    </strong>
    <button
      className="close pull-right"
      data-dismiss="alert"
      aria-label="close"
      onClick={props.onCloseError}
    >&times;</button>
    <button
      className="close"
      onClick={props.onRetry}
    >
      &#8634;
    </button>
  </span>;

ItemError.propTypes = {
  errorMessage: PropTypes.string,
  onCloseError: PropTypes.func.isRequired
};

export { ItemError };
