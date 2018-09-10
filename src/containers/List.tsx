import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import { itemsSelector } from '../selectors/itemsSelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state: IState) => ({
  items: itemsSelector(state.items.keySeq().toArray()),
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
