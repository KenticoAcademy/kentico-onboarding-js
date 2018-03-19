import { connect } from 'react-redux';

import { selectKeys } from '../selectors/memoryKeysSelector';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemKeys: selectKeys(state.items),
});

export const List = connect(mapStateToProps)(ListComponent);
