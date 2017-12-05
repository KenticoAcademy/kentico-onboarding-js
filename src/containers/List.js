import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({ itemsMap: state.itemsById });

export const List = connect(mapStateToProps, null)(ListComponent);

