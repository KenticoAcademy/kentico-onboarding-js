import { connect } from 'react-redux';

import { selectKeys, selectEditedItems } from '../selectors/memoryKeysSelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemKeys: selectKeys(state.list.items).toArray(),
  editedItems: selectEditedItems(state.list.items).filter(item => item.isBeingEdited).toArray(),
});

export const List = connect(mapStateToProps)(ListComponent);
