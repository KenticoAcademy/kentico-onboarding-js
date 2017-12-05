import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({ itemsMap: state.items.byId });

export const List = connect(mapStateToProps, null)(ListComponent);

