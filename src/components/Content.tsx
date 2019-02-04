import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { Loader } from './Loader';

export type ContentStateProps = {
  readonly isListLoaded: boolean,
};

type ContentProps = ContentStateProps;

const contentPropTypes: ValidationMap<ContentProps> = {
  isListLoaded: PropTypes.bool.isRequired,
};

export const Content: React.FunctionComponent<ContentProps> = ({ isListLoaded }) => (
  isListLoaded
    ? <List />
    : (
        <Loader
          className="aligner aligned-item"
          size={15}
        />
      )
);

Content.displayName = 'Content';
Content.propTypes = contentPropTypes;
