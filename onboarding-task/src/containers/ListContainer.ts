import { connect } from 'react-redux';

import { List } from '../components/List';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { fetchItems } from '../actionCreators/fetchItemsActionCreators';
import { createListItemWithDispatchFactory } from '../actionCreators/createListItemFactory';
import { createGuid } from '../utils/guidHelper';

const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.items.orderedIds,
    isFetching: state.items.isFetching,
    error: state.items.error,
    successMessage: state.items.successMessage,
  };
};

const mapDispatchToProps = (dispatch: dispatchType) => {
  const createListItem = createListItemWithDispatchFactory(dispatch, createGuid);
  return {
    onListItemAdd: (text: string) => dispatch(createListItem(text)),
    onListMount: () => dispatch(fetchItems()),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
