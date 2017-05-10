import * as React from 'react';

import { EditItem } from './EditItem';
import { ViewItem } from './ViewItem';
import { IItemViewModel } from '../models/IItemViewModel';

interface IListItemDataProps {
  itemViewModel: IItemViewModel,
}

interface IListItemCallbacksProps {
  onItemValueEdit: (value: string) => void,
  onDelete: () => void,
  onViewChange: () => void,
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbacksProps> = (props) => {
  const viewModel = props.itemViewModel;
  if (viewModel.isInEditMode) {
    return (
      <EditItem
        value={viewModel.value}
        index={viewModel.index}
        onEdit={props.onItemValueEdit}
        onDelete={props.onDelete}
        onCancel={props.onViewChange}
      />);
  }
  return (
    <ViewItem
      value={viewModel.value}
      index={viewModel.index}
      isSavedInDatabase={viewModel.isSavedInDatabase}
      onClick={props.onViewChange}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  itemViewModel: React.PropTypes.shape({
    id: React.PropTypes.string,
    value: React.PropTypes.string,
    index: React.PropTypes.number.isRequired,
    isInEditMode: React.PropTypes.bool.isRequired,
  }).isRequired,
  onItemValueEdit: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onViewChange: React.PropTypes.func.isRequired,
};

export { ListItem, IListItemDataProps, IListItemCallbacksProps };
