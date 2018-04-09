import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PlainItem } from '../../../containers/todo-list/item/PlainItem';
import { EditedItem } from '../../../containers/todo-list/item/EditedItem';
import { IndexedItem } from '../../../models/IndexedItem';

export interface IItemDataProps {
  readonly item: IndexedItem;
}

const Item: React.SFC<IItemDataProps> = (props: IItemDataProps): JSX.Element =>
  (props.item.isEdited) ?
    <EditedItem
      item={props.item}
    /> :
    <PlainItem
      item={props.item}
    />;


Item.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
};

export { Item }
