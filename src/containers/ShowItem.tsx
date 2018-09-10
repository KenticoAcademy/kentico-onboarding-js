import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import { ShowItem as ShowItemComponent, IShowItemProps, IShowItemStateProps } from '../components/ShowItem';

const mapStateToProps = (state: IState, { id }: {id: GUID}): IShowItemStateProps => ({
  text: state.items.get(id).text,
});

export const ShowItem: React.ComponentClass<IShowItemProps> = connect(
  mapStateToProps,
)(ShowItemComponent);
