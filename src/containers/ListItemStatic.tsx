import {
  connect,
  ComponentClass,
} from 'react-redux';
import {
  IListItemStaticCallbackProps,
  IListItemStaticDataProps,
  IListItemStaticOwnProps,
  ListItemStatic as ListItemStaticComponent,
  listItemStaticPropTypes,
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { toggleItem } from '../actions';
import { IAction } from '../models/interfaces/IAction';
import { IAppState } from '../models/state/IAppState';
import { isClickable } from '../utils/isClickable';

const mapStateToProps = (_: IAppState, { itemSyncInfo }: IListItemStaticOwnProps): IListItemStaticDataProps => ({
  isClickable: isClickable(itemSyncInfo),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { item }: IListItemStaticOwnProps): IListItemStaticCallbackProps => ({
  onItemOpened: () => dispatch(toggleItem(item.id)),
});


const ListItemStatic: ComponentClass<IListItemStaticOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = listItemStaticPropTypes;

export { ListItemStatic };
