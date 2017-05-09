import * as React from 'react';

interface IViewItemValidationProps {
  isSavedInDatabase: boolean;
}

const ViewItemValidation: React.StatelessComponent<IViewItemValidationProps> = (props) => (
  <div className="text-center">
  <span className="glyphicon glyphicon-floppy-saved"/>
    </div>
);

ViewItemValidation.displayName = 'ViewItemValidation';

ViewItemValidation.propTypes = {
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItemValidation };
