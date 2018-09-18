import { connect } from 'react-redux';
import { Item } from '../components/Item';

const mapStateToProps = (state, ownProps) => ({
  item: state.items.get(ownProps.id)
});

const ConnectedItem = connect(mapStateToProps)(Item);
export { ConnectedItem as Item };
