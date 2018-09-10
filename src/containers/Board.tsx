import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import { itemsSelector } from '../selectors/itemsSelector';
import { Board as BoardComponent, IBoardProps } from '../components/Board';

const mapStateToProps = (state: IState): IBoardProps => ({
  items: itemsSelector(state.items.keySeq().toArray()),
});

export const Board = connect(
  mapStateToProps,
)(BoardComponent);
