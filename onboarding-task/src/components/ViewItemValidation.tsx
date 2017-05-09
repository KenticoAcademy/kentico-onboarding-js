import * as React from 'react';

interface IViewItemValidationProps {
  isSavedInDatabase: boolean;
}

const ViewItemValidation: React.StatelessComponent<IViewItemValidationProps> = (props) => {
  if (props.isSavedInDatabase) {
    return (
      <span className="glyphicon glyphicon-floppy-saved"/>
    );
  }
  else {
    return (
      <span className="glyphicon glyphicon-floppy-remove"/>
    );
  }

};

ViewItemValidation.displayName = 'ViewItemValidation';

ViewItemValidation.propTypes = {
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItemValidation };
