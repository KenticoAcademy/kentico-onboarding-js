import * as React from 'react';

interface IViewItemValidationProps {
  isSavedInDatabase: boolean;
}

const ViewItemValidation: React.StatelessComponent<IViewItemValidationProps> = (props) => {
  if (props.isSavedInDatabase) {
    return (
      <span className="glyphicon glyphicon-saved"/>
    );
  }
  else {
    return (
      <span className="glyphicon glyphicon-exclamation-sign">Item is not saved on the server yet</span>
    );
  }

};

ViewItemValidation.displayName = 'ViewItemValidation';

ViewItemValidation.propTypes = {
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItemValidation };
