import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IListItemDataProps,
  ListItem as ListItemComponent,
  listItemPropTypes,
} from '../components/ListItem';
import { IAppState } from '../models/state/IAppState';
import { Guid } from '../models/Guid';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';

interface IListItemContainerDataProps {
  readonly itemNumber: number;
  readonly itemId: Guid;
  readonly itemSyncInfo: IItemSyncInfo;
}

const mapStateToProps = (state: IAppState, { itemId }: IListItemContainerDataProps): IListItemDataProps => ({
  item: state.list.items.get(itemId),
});

const ListItem: ComponentClass<IListItemContainerDataProps> = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = listItemPropTypes;

export { ListItem };
