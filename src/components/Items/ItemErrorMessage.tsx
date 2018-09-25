import * as React from 'react';
import { Map } from 'immutable';
import * as PropTypes from 'prop-types';

export interface IItemErrorMessageDataProps {
  errorMessages: Map<string, string>;
}

type IItemErrorMessageProps = IItemErrorMessageDataProps;

const ItemErrorMessage:
  React.StatelessComponent<IItemErrorMessageProps> = ({errorMessages}) => {

    return (
        <div className="list__item_content">{errorMessages.valueSeq()}</div>
    );
};

ItemErrorMessage.displayName = 'ItemErrorMessage';

ItemErrorMessage.propTypes = {
  errorMessages: PropTypes.instanceOf(Map).isRequired,
};

export { ItemErrorMessage };
