import { connect, Dispatch } from 'react-redux';

import {
  IListItemDisplayDispatchProps,
  IListItemDisplayOriginalProps,
  ListItemDisplay as ListItemDisplayComponent,
} from '../components/ListItemDisplay';
import { startItemEditing } from '../actions';
import { IAction } from '../@types/IAction';

const mapDispatchToProps =
  (dispatch: Dispatch<IAction>, ownProps: IListItemDisplayOriginalProps): IListItemDisplayDispatchProps => ({
    onEdit: () => dispatch(startItemEditing(ownProps.item.key)),
  });

export const ListItemDisplay = connect(null, mapDispatchToProps)(ListItemDisplayComponent);
