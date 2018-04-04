import {
  connect,
  ComponentClass,
} from 'react-redux';
import {
  IListItemStaticCallbackProps,
  IListItemStaticOwnProps,
  ListItemStatic as ListItemStaticComponent,
  listItemStaticPropTypes,
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { changeItemOpenState } from '../actions';
import { IAction } from '../models/interfaces/IAction';

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { item }: IListItemStaticOwnProps): IListItemStaticCallbackProps => ({
  onItemOpened: () => dispatch(changeItemOpenState(item.id)),
});

const ListItemStatic: ComponentClass<IListItemStaticOwnProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = listItemStaticPropTypes;

export { ListItemStatic };
