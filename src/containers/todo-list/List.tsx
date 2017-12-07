import { connect } from 'react-redux';
import { IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
