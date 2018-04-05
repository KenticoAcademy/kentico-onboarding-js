import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IListItemDataProps,
  IListItemOwnProps,
  ListItem as ListItemComponent,
  listItemPropTypes,
} from '../components/ListItem';
import { IAppState } from '../models/state/IAppState';
import { Uuid } from '../models/Uuid';

interface IListItemContainerDataProps extends IListItemOwnProps {
  readonly itemId: Uuid;
}

const mapStateToProps = ({ list }: IAppState, { itemId }: IListItemContainerDataProps): IListItemDataProps => ({
  item: list.items.get(itemId),
});

const ListItem: ComponentClass<IListItemContainerDataProps> = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = listItemPropTypes;

export { ListItem };
