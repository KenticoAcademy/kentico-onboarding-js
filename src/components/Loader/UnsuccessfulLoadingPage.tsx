import * as React from 'react';
import * as PropTypes from 'prop-types';


export interface IUnsuccessfulLoadingPageStateProps {
  errorMessage: string;
}

const UnsuccessfulLoadingPage: React.StatelessComponent<IUnsuccessfulLoadingPageStateProps> = ({errorMessage}) => (
  <div className="warning__container">
    <div className="warning__content">
      <strong>{errorMessage}</strong>
    </div>
    <div className="warning__content">
      <img
        className="img__sad-cat"
        src="/images/sadCat.gif"
        width="200px"
      />
    </div>
    <div className="warning__content">
      Try again later.
    </div>
  </div>);

UnsuccessfulLoadingPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

UnsuccessfulLoadingPage.displayName = 'UnsuccessfulLoadingPage';

export {UnsuccessfulLoadingPage};
