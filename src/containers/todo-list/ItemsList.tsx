import { connect } from 'react-redux';
import {
  IListDataProps,
  ItemsList
} from '../../components/todo-list/ItemsList';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
});

const connectedComponent = connect(mapStateToProps)(ItemsList);

export { connectedComponent as ItemsList };
