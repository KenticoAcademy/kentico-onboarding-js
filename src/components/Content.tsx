import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { Loader } from './Loader';
import classNames from 'classnames';

export type ContentStateProps = {
  readonly isLoading: boolean,
  readonly error: string,
};

type ContentProps = ContentStateProps;

const contentPropTypes: ValidationMap<ContentProps> = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export const Content: React.StatelessComponent<ContentProps> = ({ isLoading, error }): JSX.Element => {
  const className: string = classNames('', {'aligner aligner-item': isLoading});

  return (
    <section className={className} id="app-content">
      {isLoading && error === '' && <Loader />}
      {!isLoading && <List />}
    </section>
  );
};

Content.displayName = 'Content';
Content.propTypes = contentPropTypes;
