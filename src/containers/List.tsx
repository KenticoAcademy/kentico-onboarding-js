import * as React from 'react';
import { connect } from 'react-redux';
import { ListStateProps, List as ListComponent } from '../components/List';
import { IAppState } from '../store/state/IAppState';
import { getAllIds } from '../utils/getAllIds';

const mapStateToProps = (state: IAppState): ListStateProps => ({
  itemIds: getAllIds(state.list.items),
});

export const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);
