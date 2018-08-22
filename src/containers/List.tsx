import * as React from 'react';
import { connect } from 'react-redux';

import { List as ListComponent, IListStateProps } from '../components/List';
import { getKeys } from '../utils/getKeys';
import { IAppState } from '../reducers/interfaces/IAppState';

const mapStateToProps = (state: IAppState): IListStateProps => ({
  itemIds: getKeys(state.list.items).reverse(),
});

export const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);

