import * as React from 'react';
import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';
import { getKeys } from '../utils/getKeys';
import { IAppState } from '../interfaces/IAppState';

const mapStateToProps = (state: IAppState) => ({
  itemIds: getKeys(state.list.items),
});

export const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);

