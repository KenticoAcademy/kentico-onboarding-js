import * as React from 'react';
import * as PropTypes from 'prop-types';

interface INoteErrorMessageDataProps {
  readonly isError: boolean;
  readonly errorMessage: string;
}

const NoteErrorMessage: React.StatelessComponent<INoteErrorMessageDataProps> = (props: INoteErrorMessageDataProps): JSX.Element | null => {
  const error = (
    <span className="text-danger">{props.errorMessage}</span>
  );

  return props.isError ? error : null;
};

NoteErrorMessage.displayName = 'NoteErrorMessage';

NoteErrorMessage.propTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export { NoteErrorMessage };
