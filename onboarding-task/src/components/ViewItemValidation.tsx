import * as React from 'react';

interface IViewItemValidationProps {
  isSavedInDatabase: boolean;
}

const ViewItemStatus: React.StatelessComponent<IViewItemValidationProps> = (props) => {
  if (props.isSavedInDatabase) {
    return (
      <span title="Item is saved on the server">
        <span className="glyphicon glyphicon-saved"/>
      </span>
    );
  }else {
    return (
      <span title="Item is not saved on the server yet">
        <span className="glyphicon glyphicon-exclamation-sign"/>
      </span>
    );
  }
};

ViewItemStatus.displayName = 'ViewItemStatus';

ViewItemStatus.propTypes = {
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItemStatus };
