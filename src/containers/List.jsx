import { connect } from 'react-redux';

import { selectKeys } from '../utils/memoryKeysSelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  items: selectKeys(state.items),
});

export const List = connect(mapStateToProps)(ListComponent);
