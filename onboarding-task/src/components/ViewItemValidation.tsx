import * as React from 'react';

interface IViewItemValidationProps {
  isSavedInDatabase: boolean;
}

const ViewItemValidation: React.StatelessComponent<IViewItemValidationProps> = (props) => {
  if (props.isSavedInDatabase) {
    return (
      <span title="Item is saved on the server">
        <span className="glyphicon glyphicon-saved"/>
      </span>
    );
  }
  else {
    return (
      <span title="Item is not saved on the server yet">
        <span className="glyphicon glyphicon-exclamation-sign"/>
      </span>
    );
  }

};

ViewItemValidation.displayName = 'ViewItemValidation';

ViewItemValidation.propTypes = {
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItemValidation };
