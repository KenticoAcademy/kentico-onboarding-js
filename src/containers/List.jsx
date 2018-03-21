import { connect } from 'react-redux';

import { selectKeys, selectItems } from '../selectors/memorySelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemKeys: selectKeys(state.list.items).toArray(),
  selectedKeys: selectItems(state.list.items)
    .filter(item => item.isBeingEdited)
    .map(item => item.key)
    .toArray(),
});

export const List = connect(mapStateToProps)(ListComponent);
