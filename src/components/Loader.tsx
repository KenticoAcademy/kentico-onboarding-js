import '../styles/sticky-footer.css';
import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';

export type LoaderContainerProps = {
  readonly size: number,
  readonly className: string,
};

type LoaderProps = LoaderContainerProps;

const loaderPropTypes: ValidationMap<LoaderProps> = {
  size: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export const Loader: React.FunctionComponent<LoaderProps> = ({ size, className }) => (
  <div className={className}>
    <PulseLoader sizeUnit="px" size={size} color="#36D7B7"/>
  </div>
);

Loader.displayName = 'Loader';
Loader.propTypes = loaderPropTypes;
