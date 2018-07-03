import { connect, Dispatch } from 'react-redux';

import {
  IListItemDisplayDispatchProps,
  IListItemDisplayOriginalProps,
  ListItemDisplay as ListItemDisplayComponent,
} from '../components/ListItemDisplay';
import { startItemEditing } from '../actions';
import { IState } from '../store/IState';

const mapDispatchToProps =
  (dispatch: Dispatch<IState>, ownProps: IListItemDisplayOriginalProps): IListItemDisplayDispatchProps => ({
    onEdit: () => dispatch(startItemEditing(ownProps.item.key)),
  });

export const ListItemDisplay: React.ComponentClass<IListItemDisplayOriginalProps>
  = connect<undefined, IListItemDisplayDispatchProps>(undefined, mapDispatchToProps)(ListItemDisplayComponent);
