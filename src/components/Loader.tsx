import '../styles/sticky-footer.css';
import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';

export type LoaderContainerProps = {
  readonly size: number,
  readonly classNames: string,
};

type LoaderProps = LoaderContainerProps;

const loaderPropTypes: ValidationMap<LoaderProps> = {
  size: PropTypes.number.isRequired,
  classNames: PropTypes.string.isRequired,
};

export const Loader: React.StatelessComponent<LoaderProps> = ({ size, classNames }): JSX.Element => (
  <div className={classNames}>
    <PulseLoader sizeUnit="px" size={size} color="#36D7B7"/>
  </div>
);

Loader.displayName = 'Loader';
Loader.propTypes = loaderPropTypes;
