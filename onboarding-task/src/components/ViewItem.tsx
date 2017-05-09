import * as React from 'react';
import { ViewItemValidation } from './ViewItemValidation';

interface IViewItemProps {
  onClick: () => void;
  value: string;
  index: number;
  isSavedInDatabase: boolean;
}

const ViewItem: React.StatelessComponent<IViewItemProps> = (props) => (
  <div onClick={props.onClick}>
    {props.index}. {props.value}
    <div className="text-center">
      <ViewItemValidation isSavedInDatabase={props.isSavedInDatabase}/>
    </div>
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
