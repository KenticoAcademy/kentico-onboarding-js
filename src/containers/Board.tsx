import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import { itemsSelector } from '../selectors/itemsSelector';
import { Board as BoardComponent, IBoardProps } from '../components/Board';

const mapStateToProps = (state: IState): IBoardProps => ({
  items: itemsSelector(state.board.items),
});

export const Board: React.ComponentClass = connect(
  mapStateToProps,
)(BoardComponent);
