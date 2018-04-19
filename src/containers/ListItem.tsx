import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IListItemDataProps,
  IListItemOwnProps,
  ListItem as ListItemComponent,
  listItemSharedPropTypes,
} from '../components/ListItem';
import { IAppState } from '../models/state/IAppState';
import { Uuid } from '../models/Uuid';

interface IListItemContainerDataProps extends IListItemOwnProps {
  readonly itemId: Uuid;
}

const mapStateToProps = ({ list }: IAppState, { itemId }: IListItemContainerDataProps): IListItemDataProps => ({
  isBeingEdited: list.items.get(itemId).isBeingEdited,
});

const ListItem: ComponentClass<IListItemContainerDataProps> = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = listItemSharedPropTypes;

export { ListItem };
