import * as React from 'react';
import { ViewItemStatus } from './ViewItemValidation';

interface IViewItemProps {
  onClick: () => void;
  value: string;
  index: number;
  isSavedInDatabase: boolean;
}

const ViewItem: React.StatelessComponent<IViewItemProps> = (props) => (

  <div onClick={props.onClick}>
    <span className="col-sm-6">
      {props.index}. {props.value}
    </span>
    <span className="col-sm-6-push">
      <ViewItemStatus isSavedInDatabase={props.isSavedInDatabase}/>
    </span>
  </div>
);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  isSavedInDatabase: React.PropTypes.bool.isRequired,
};

export { ViewItem };
