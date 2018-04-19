import * as PropTypes from 'prop-types';
import {
  connect,
  ComponentClass,
} from 'react-redux';
import {
  IListItemStaticCallbackProps,
  IListItemStaticDataProps,
  IListItemStaticOwnProps,
  ListItemStatic as ListItemStaticComponent,
  listItemStaticSharedPropTypes,
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { toggleItem } from '../actions';
import { IAction } from '../models/interfaces/IAction';
import { IAppState } from '../models/state/IAppState';
import { isClickable } from '../utils/isClickable';
import { Uuid } from '../models/Uuid';

interface IListItemStaticContainerProps extends IListItemStaticOwnProps {
  readonly itemId: Uuid;
}

const propTypes = {
  ...listItemStaticSharedPropTypes,
  itemId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ list }: IAppState, { itemSyncInfo, itemId }: IListItemStaticContainerProps): IListItemStaticDataProps => ({
  isClickable: isClickable(itemSyncInfo),
  item: list.items.get(itemId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { itemId }: IListItemStaticContainerProps): IListItemStaticCallbackProps => ({
  onItemOpened: () => dispatch(toggleItem(itemId)),
});


const ListItemStatic: ComponentClass<IListItemStaticOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
