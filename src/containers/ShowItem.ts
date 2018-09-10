import { connect } from 'react-redux';
import { ShowItem as ShowItemComponent } from '../components/ShowItem';

const mapStateToProps = (state, { id }) => ({
  text: state.items.get(id).text
});

export const ShowItem = connect(
  mapStateToProps,
)(ShowItemComponent);
