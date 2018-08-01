import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { getKeys } from '../utils/getKeys';

const mapStateToProps = (state) => ({
  itemIds: getKeys(state.list.items),
});

export const List = connect(mapStateToProps)(ListComponent);
