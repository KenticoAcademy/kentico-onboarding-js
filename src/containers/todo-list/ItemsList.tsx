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

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(ItemsList);

export { connectedComponent as ItemsList };
