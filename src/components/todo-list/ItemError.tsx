import * as React from 'react';
import { PropTypes } from 'react';

interface IProps {
  errorMessage: string;
  onCloseError: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ItemError: React.SFC<IProps> = (props: IProps): JSX.Element =>
  (props.errorMessage !== '')
    ? <span
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
    </span>
    : <span />;

ItemError.propTypes = {
  errorMessage: PropTypes.string,
  onCloseError: PropTypes.func.isRequired
};

export { ItemError }
