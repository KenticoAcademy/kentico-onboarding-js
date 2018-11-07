import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { Loader } from './Loader';

export type ContentStateProps = {
  readonly isLoading: boolean,
  readonly error: string | null,
};

type ContentProps = ContentStateProps;

const contentPropTypes: ValidationMap<ContentProps> = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export const Content: React.StatelessComponent<ContentProps> = ({ isLoading, error }): JSX.Element => (
  <section className={isLoading ? 'aligner aligner-item' : undefined}>
    {isLoading && error === null && <Loader className="aligner aligner-item" size={15} />}
    {!isLoading && <List />}
  </section>
);

Content.displayName = 'Content';
Content.propTypes = contentPropTypes;
