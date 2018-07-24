import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  list: state.list,
});

export const List = connect(mapStateToProps)(ListComponent);
