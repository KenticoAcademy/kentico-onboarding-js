import * as React from 'react';
import {Map} from 'immutable';
import * as PropTypes from 'prop-types';


export interface IItemErrorMessageStateProps {
  errorMessages: Map<string, string>;
}

const ItemErrorMessage: React.StatelessComponent<IItemErrorMessageStateProps> = ({errorMessages}) => (
  <div className="list__item_content">
    {errorMessages.valueSeq()}
  </div>);

ItemErrorMessage.displayName = 'ItemErrorMessage';

ItemErrorMessage.propTypes = {
  errorMessages: PropTypes.instanceOf(Map).isRequired,
};

export {ItemErrorMessage};
