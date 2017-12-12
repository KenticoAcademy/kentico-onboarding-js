import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';

const mapStateToProps = state => {
  const items = state.list.items.valueSeq().toArray();

  return {
    items,
  };
};

export const Items = connect(
  mapStateToProps,
)(ItemsComponent);
