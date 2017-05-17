import * as React from 'react';
import { ViewItemStatus } from './ViewItemStatus';
import { IItemViewModel } from '../models/IItemViewModel';

interface IViewItemProps {
  onClick: () => void;
  item: IItemViewModel;
}

const ViewItem: React.StatelessComponent<IViewItemProps> = (props) => (
  <div onClick={props.onClick}>
    <span className="col-sm-6">
      {props.item.index}. {props.item.value}
    </span>
    <span className="col-sm-6-push">
      <ViewItemStatus isSavedInDatabase={props.item.isSavedInDatabase}/>
    </span>
  </div>
);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  item: React.PropTypes.shape({
    id: React.PropTypes.string,
    value: React.PropTypes.string,
    index: React.PropTypes.number,
    isSavedInDatabase: React.PropTypes.bool,
  })
};

export { ViewItem };
