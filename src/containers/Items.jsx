import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
  const items = state.list.items.valueSeq().toArray();

  return {
    items,
  };
};

export const Items = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsComponent);
