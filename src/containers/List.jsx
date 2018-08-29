import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = state => ({
  items: state.items.entrySeq()
});

export const List = connect(mapStateToProps)(ListComponent);
