import { connect } from 'react-redux';

import { getMemoizedKeys } from '../selectors/memorySelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = ({ list }) => ({
  itemKeys: getMemoizedKeys(list.items.keySeq()),
});

export const List = connect(mapStateToProps)(ListComponent);
