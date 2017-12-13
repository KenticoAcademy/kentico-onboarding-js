import { connect } from 'react-redux';
import moize from 'moize';
import { Items as ItemsComponent } from '../components/Items';

const mapStateToProps = state => {
  const items = state.list.items.valueSeq().toArray();

  return {
    items,
  };
};

const mapStateToPropsMoized = moize(mapStateToProps);

export const Items = connect(
  mapStateToPropsMoized,
)(ItemsComponent);
